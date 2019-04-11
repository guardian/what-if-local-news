package com.gu.localnews.common

import play.api.libs.json._

case class PetitionSignature(name: String)

object PetitionSignature {
  implicit val format: Format[PetitionSignature] = new Format[PetitionSignature] {
    def writes(p: PetitionSignature): JsValue = JsString(p.name)
    def reads(json: JsValue): JsResult[PetitionSignature] = Reads.StringReads.reads(json).map(PetitionSignature.apply)
  }

  def fromStringFormat(text: String) = {
    text.split("</li>").map { entry =>
      val name = entry.stripPrefix("<li>").split(",")(0).trim()

      def emptyToNone(s: String) = {
        if (s.isEmpty) {
          None
        } else {
          Some(s)
        }
      }
      PetitionSignature(name)
    }.toList
  }

}
