package com.gu.localnews.common.services.index

import com.gu.localnews.common.HealthContract
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import com.sksamuel.elastic4s.http.index.admin.IndexExistsResponse

import scala.concurrent.{Await, ExecutionContext, Future}
import scala.concurrent.duration._
import scala.util.{Failure, Success}


trait HealthContractsIndex {
  def client: ElasticClient

  def setupHealthContracts()(implicit ec: ExecutionContext) = {

    Await.ready(client.execute(indexExists("health-contracts")).flatMap { resp =>
      println("Checking if we need to create health-contracts index...")
      resp.result match {
        case IndexExistsResponse(false) =>

          println("Index did not already exist - creating")
          client.execute(createIndex("health-contracts").mappings(
            mapping("_doc").as(
              textField("title"),
              textField("organisationName"),
              textField("description"),
              textField("publishedDate"), // Make date field?
              textField("status"),
              floatField("valueLow"),
              floatField("valueHigh"),
              textField("awardedDate"), // Make date fields?
              floatField("awardedValue"),
              objectField("suppliers").fields(
                textField("name"),
                textField("address"),
                textField("refType"),
                textField("refNumber"),
                booleanField("isSME"),
                booleanField("isVCSE")
              ),
              ElasticsearchHelpers.entityFieldMappings
            )
          ))
        case _ =>
          println("Index already exists!")
          Future.successful()
      }
    }, 10 seconds)
  }

  def insertHealthContracts(contract: HealthContract)(implicit ec: ExecutionContext) = {
    val values = Map(
      "title" -> contract.title,
      "organisationName" -> contract.organisationName,
      "description" -> contract.description,
      "publishedDate" -> contract.publishedDate, // Make date field?
      "status" -> contract.status,
      "entities" -> Map(
        "people" -> contract.entities.people,
        "places" -> contract.entities.places,
        "organisations" -> contract.entities.organisations,
        "dates" -> contract.entities.dates, // TOOD make dates fields?
        "keyPhrases" -> contract.entities.keyPhrases,
        "sentiment" -> contract.entities.sentiment,
      )
    ) ++
      contract.valueLow.map("valueLow" -> _) ++
      contract.valueHigh.map("valueHigh" -> _) ++
      contract.awardedDate.map("awardedDate" -> _)++
      contract.awardedValue.map("awardedValue" -> _) ++
      contract.suppliers.map { suppliers =>
        "suppliers" -> suppliers.map { supplier =>
          Map(
            "name" -> supplier.name,
            "address" -> supplier.address,
            "isSME" -> supplier.isSME,
            "isVCSE" -> supplier.isVCSE
          ) ++ supplier.refType.map("refType" -> _) ++ supplier.refNumber.map("refNumber" -> _)
        }
      }

    val future = client.execute(indexInto("health-contracts" / "_doc").fields(values))

    future.andThen {
      case Success(response) => println(s"Successfully inserted document ${response.result}")
      case Failure(why) => println(s"Failed to insert document ${why}")
    }

    future
  }

}
