package com.gu.localnews.common.services.index

import com.gu.localnews.common.model.{SearchHit, SearchParameters}
import com.sksamuel.elastic4s.FetchSourceContext
import com.sksamuel.elastic4s.http.ElasticClient
import com.sksamuel.elastic4s.http.ElasticDsl._
import com.sksamuel.elastic4s.http.search.{SearchHit => EsHit}

import scala.concurrent.ExecutionContext

class Index(val client: ElasticClient)
  extends CouncilContractsIndex
    with PlanningApplicationsIndex
    with CouncilPetitionsIndex {
  def query(searchParams: SearchParameters)(implicit ec: ExecutionContext) = {

    def hitField(hit: Map[String, AnyRef], fieldName: String): (String, String) = {
      if (hit isDefinedAt(fieldName)) {
        fieldName -> hit(fieldName).toString()
      } else {
        // TODO Is this the right way to deal with empty fields
        fieldName -> ""
      }
    }

    val highlightDefinition = highlight("*")
      .order("score")

     client.execute(
      search("_all").query(
        must(queryStringQuery(searchParams.q).defaultOperator("and"))
      )
        .from(searchParams.from)
        .size(searchParams.size)
        .highlighting(highlightDefinition)

    ).map { resp =>
       resp.result.hits.hits.map { hit =>
         val sourceMap = hit.sourceAsMap
         hit.index match {
           case "council-contracts" =>
             SearchHit(hit.index,
               hit.id,
               hitField(sourceMap, "title")._2,
               Map()+ hitField(sourceMap, "description")+
                 hitField(sourceMap, "valueLow")+
                 hitField(sourceMap, "valueHigh")+
                 hitField(sourceMap, "publishedDate")+
                 hitField(sourceMap, "organisationName")+
                 hitField(sourceMap, "status"),
               hit.highlight.values.flatten.toList
             )

           case "planning-applications" =>
             SearchHit(hit.index,
               hit.id,
               hitField(sourceMap, "proposal")._2,
               Map()+ hitField(sourceMap, "applicationLink")+
                 hitField(sourceMap, "caseRef")+
                 hitField(sourceMap, "conservationArea")+
                 hitField(sourceMap, "dateReceived")+
                 hitField(sourceMap, "status")+
                 hitField(sourceMap, "applicationType")+
                 hitField(sourceMap, "applicantCompany")+
                 hitField(sourceMap, "applicantName"),
                 hit.highlight.values.flatten.toList
               )

           case "council-petitions" =>
             SearchHit(hit.index,
               hit.id,
               hitField(sourceMap, "title")._2,
               Map() + hitField(sourceMap, "description")+
                hitField(sourceMap, "petitionLink")+
                hitField(sourceMap, "backgroundInfo")+
                hitField(sourceMap, "creator")+
                hitField(sourceMap, "signatures"),
               hit.highlight.values.flatten.toList
               )

           case unknown => throw new Exception("Unknown index: ${unknown}")
         }
       }
     }
  }
}


