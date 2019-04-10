package com.gu.localnews.common.services.index

import com.gu.localnews.common.model.{SearchHit, SearchParameters, SearchResults, SignificantTerm}
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
         .aggs(
           /**
             *
           textField("people").fields(keywordField("raw")),
      textField("places").fields(keywordField("raw")),
      textField("organisations").fields(keywordField("raw")),
      textField("dates").fields(keywordField("raw")),
      textField("keyPhrases").fields(keywordField("raw")),
      textField("sentiment").fields(keywordField("raw"))
             */
           termsAggregation("significant_people").field("entities.people.raw"),
           termsAggregation("significant_places").field("entities.places.raw"),
           termsAggregation("significant_organisations").field("entities.organisations.raw"),
           termsAggregation("significant_dates").field("entities.dates.raw"),
           termsAggregation("significant_key_phrases").field("entities.keyPhrases.raw"),
           termsAggregation("significant_sentiment").field("entities.sentiment.raw"),
         )


    ).map { resp =>
       val hits = resp.result.hits.hits.map { hit =>
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

       val keys = resp.result.aggregationsAsMap.keys

       val aggs = resp.result.aggregationsAsMap.mapValues { buckets =>
         val bucketValues = buckets.asInstanceOf[Map[String, Any]]("buckets").asInstanceOf[List[Map[String, Any]]]
         bucketValues.map { value =>
           SignificantTerm(value("key").asInstanceOf[String], value("doc_count").asInstanceOf[Int])
         }
       }
       SearchResults(hits, aggs)
     }
  }
}


