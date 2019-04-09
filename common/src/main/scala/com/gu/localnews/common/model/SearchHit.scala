package com.gu.localnews.common.model

import play.api.libs.json.Json

case class SearchHit(index: String, title: String)

object SearchHit {
  implicit val format = Json.format[SearchHit]
}
