package com.gu.localnews.common.services.index

import com.sksamuel.elastic4s.http.ElasticDsl._
import com.gu.localnews.common.CouncilContract
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.index.CreateIndexResponse
import com.sksamuel.elastic4s.http.index.admin.IndexExistsResponse

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, ExecutionContext, Future}

trait CouncilContractsIndex {
  def client: ElasticClient

  def setupCouncilContracts()(implicit ec: ExecutionContext) = {
    client.execute(indexExists("council-contracts")).flatMap {
      case IndexExistsResponse(false) =>
        Await.ready(client.execute(createIndex("council-contracts").mappings(
          mapping("_doc").as(
            textField("title"),
            textField("organisationName"),
            textField("description"),
            textField("publishedDate"), // Make date?
            textField("status"),
            floatField("valueLow"),
            floatField("valueHigh"),
            textField("awardedDate"), // Make date?
            floatField("awardedValue"),
            objectField("suppliers").fields(
              textField("name"),
              textField("address"),
              textField("refType"),
              textField("refNumber"),
              booleanField("isSME"),
              booleanField("isVCSE")
            ),
            objectField("entities").fields(
              textField("people"),
              textField("places"),
              textField("organisations"),
              textField("dates"), // TOOD make dates?
              textField("keyPhrases"),
              textField("sentiment"),
            )
          )
        )), Duration.Inf)
      case _ =>
        Future.successful()
    }
  }

  def insertCouncilContracts(contract: CouncilContract): Unit = {
    // TODO
  }
}
