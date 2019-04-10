package com.gu.localnews.common.services.index

import com.sksamuel.elastic4s.http.ElasticDsl._
import com.gu.localnews.common.PlanningApplication
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.index.CreateIndexResponse
import com.sksamuel.elastic4s.http.index.admin.IndexExistsResponse

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}
import scala.concurrent.duration._
import scala.util.{Failure, Success}


trait PlanningApplicationsIndex {
  def client: ElasticClient

  def setupPlanningApplications()(implicit ec: ExecutionContext): Unit ={
    Await.ready(client.execute(indexExists("planning-applications")).flatMap { resp =>
      println("Checking if we need to create planning-applications index...")
      resp.result match {
        case IndexExistsResponse(false) =>

          println("Index did not already exist - creating")
          client.execute(createIndex("planning-applications").mappings(
            mapping("_doc").as(
              textField("address"),
              textField("caseRef"),
              textField("conservationArea"),
              textField("applicantName"),
              textField("applicantCompany"),
              textField("applicationType"),
              textField("applicationLink"),
              textField("proposal"),
              textField("dateReceived"),
              textField("status"),
              ElasticsearchHelpers.entityFieldMappings
            )
          ))
        case _ =>
          println("Index already exists!")
          Future.successful()
      }
    }, 10 seconds)

  }

  def insertPlanningApplications(application: PlanningApplication)(implicit ec: ExecutionContext): Unit ={
    val values = Map(
      "address" -> application.address,
      "caseRef" -> application.caseRef,
      "proposal" -> application.proposal,
      "dateReceived" -> application.dateReceived, // Make date field?
      "status" -> application.status,
      "entities" -> Map(
        "people" -> application.entities.people,
        "places" -> application.entities.places,
        "organisations" -> application.entities.organisations,
        "dates" -> application.entities.dates, // TOOD make dates fields?
        "keyPhrases" -> application.entities.keyPhrases,
        "sentiment" -> application.entities.sentiment,
      )
    )++
      application.conservationArea.map("conservationArea" -> _) ++
      application.applicantName.map("applicantName" -> _) ++
      application.applicantCompany.map("applicantCompany" -> _)++
      application.applicationType.map("applicationType" -> _) ++
      application.applicationLink.map("applicationLink" -> _)


    client.execute(indexInto("planning-applications" / "_doc").fields(values)).andThen {
      case Success(response) => println(s"Successfully inserted document ${response.result}")
      case Failure(why) => println(s"Failed to insert document ${why}")
    }

  }

}
