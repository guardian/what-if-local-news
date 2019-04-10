package com.gu.localnews.common.services.index

import com.gu.localnews.common.model.{SearchHit, SearchParameters}
import com.sksamuel.elastic4s.FetchSourceContext
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._

import scala.concurrent.ExecutionContext

class Index(val client: ElasticClient)
  extends CouncilContractsIndex
    with PlanningApplicationsIndex
    with CouncilPetitionsIndex {
  def query(searchParams: SearchParameters)(implicit ec: ExecutionContext) = {
    val highlightDefinition = highlight("*")
      .order("score")
      .preTag("<result-highlight>").postTag("</result-highlight>")

     client.execute(
      search("_all").query(
        must(queryStringQuery(searchParams.q).defaultOperator("and"))
      )
        .from(searchParams.from)
        .size(searchParams.size)
    ).map { resp =>
       resp.result.hits.hits.map { hit =>
         hit.index match {
           case "council-contracts" =>
             SearchHit(hit.index, hit.sourceAsMap("title").asInstanceOf[String])
           case "planning-applications" =>
             SearchHit(hit.index, hit.sourceAsMap("proposal").asInstanceOf[String])
           case "council-petitions" =>
             SearchHit(hit.index, hit.sourceAsMap("title").asInstanceOf[String])
           case unknown => throw new Exception("Unknown index: ${unknown}")
         }
       }
     }
  }
}


