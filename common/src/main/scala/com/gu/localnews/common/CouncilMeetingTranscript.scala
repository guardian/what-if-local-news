package com.gu.localnews.common

import play.api.libs.json.Json

case class CouncilMeetingTranscript(
                                     text: String,
                                     entities: DocumentEntities)

object CouncilMeetingTranscript {
  implicit val format = Json.format[CouncilMeetingTranscript]
}

