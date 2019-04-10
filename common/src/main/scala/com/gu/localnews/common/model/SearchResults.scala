package com.gu.localnews.common.model

import play.api.libs.json.Json

case class SignificantTerm(key: String, count: Int)

object SignificantTerm {
  implicit val format = Json.format[SignificantTerm]
}

case class SearchResults(hits: Array[SearchHit], aggs: Map[String, List[SignificantTerm]])

object SearchResults {
  implicit val format = Json.format[SearchResults]
}