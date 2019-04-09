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
              objectField("entities").fields(
                textField("people"),
                textField("places"),
                textField("organisations"),
                textField("dates"), // TOOD make dates fields?
                textField("keyPhrases"),
                textField("sentiment"),
              )
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
      "conservationArea" -> application.conservationArea,
      "applicantName" -> application.applicantName,
      "applicantCompany" -> application.applicantCompany,
      "applicationType" -> application.applicationType,
      "applicationLink" -> application.applicationLink,
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
    )

    client.execute(indexInto("planning-applications" / "_doc").fields(values)).andThen {
      case Success(response) => println(s"Successfully inserted document ${response.result}")
      case Failure(why) => println(s"Failed to insert document ${why}")
    }

  }

}
