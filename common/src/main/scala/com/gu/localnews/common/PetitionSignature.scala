package com.gu.localnews.common

case class PetitionSignature(val name: String)

object PetitionSignature {
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
