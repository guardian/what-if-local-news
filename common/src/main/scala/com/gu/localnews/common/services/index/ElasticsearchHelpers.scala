package com.gu.localnews.common.services.index

import com.sksamuel.elastic4s.http.ElasticDsl._

object ElasticsearchHelpers {
  def entityFieldMappings = {
    objectField("entities").fields(
      textField("people").fields(keywordField("raw")),
      textField("places").fields(keywordField("raw")),
      textField("organisations").fields(keywordField("raw")),
      textField("dates").fields(keywordField("raw")),
      textField("keyPhrases").fields(keywordField("raw")),
      textField("sentiment").fields(keywordField("raw"))
    )
  }
}
