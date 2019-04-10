package com.gu.localnews.common.services.index

import com.sksamuel.elastic4s.http.ElasticDsl._
import com.gu.localnews.common.CouncilPetition
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.index.CreateIndexResponse
import com.sksamuel.elastic4s.http.index.admin.IndexExistsResponse

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}
import scala.concurrent.duration._
import scala.util.{Failure, Success}


trait CouncilPetitionsIndex {
  def client: ElasticClient

  def setupCouncilPetitions()(implicit ec: ExecutionContext) = {
    Await.ready(client.execute(indexExists("council-petitions")).flatMap { resp =>
      println("Checking if we need to create council petitions index...")
      resp.result match {
        case IndexExistsResponse(false) =>

          println("Index did not already exist - creating")
          client.execute(createIndex("council-petitions").mappings(
            mapping("_doc").as(
              textField("title"),
              textField("petitionLink"),
              textField("description"),
              textField("backgroundInfo"),
              textField("closingDate"), // Make date field?
              textField("creator"),
              textField("signatures"),
              ElasticsearchHelpers.entityFieldMappings
            )
          ))
        case _ =>
          println("Index already exists!")
          Future.successful()
      }
    }, 10 seconds)
  }


  def insertCouncilPetitions(petition: CouncilPetition)(implicit ec: ExecutionContext): Unit = {
    val values = Map(
      "title" -> petition.title,
      "petitionLink" -> petition.petitionLink,
      "description" -> petition.description,
      "backgroundInfo" -> petition.backgroundInfo,
      "closingDate" -> petition.closingDate, // Make date field?
      "creator" -> petition.creator,
      "signatures" -> petition.signatures,
      "entities" -> Map(
        "people" -> petition.entities.people,
        "places" -> petition.entities.places,
        "organisations" -> petition.entities.organisations,
        "dates" -> petition.entities.dates, // TOOD make dates fields?
        "keyPhrases" -> petition.entities.keyPhrases,
        "sentiment" -> petition.entities.sentiment,
      )
    ) ++
      petition.description.map("description" -> _) ++
      petition.backgroundInfo.map("backgroundInfo" -> _) ++
      petition.signatures.map("signatures" -> _.map(_.name))

    client.execute(indexInto("council-petitions" / "_doc").fields(values)).andThen {
      case Success(response) => println(s"Successfully inserted document ${response.result}")
      case Failure(why) => println(s"Failed to insert document ${why}")
    }
  }

}
