package com.gu.localnews.common.model

import play.api.libs.json.Json

case class SearchHit(index: String, title: String, fields: Map[String, String], highlights: List[String])

object SearchHit {
  implicit val format = Json.format[SearchHit]
}
