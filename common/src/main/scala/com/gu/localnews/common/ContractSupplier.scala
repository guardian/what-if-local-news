package com.gu.localnews.common

case class ContractSupplier(name: String,
                            address: String,
                            refType: Option[String],
                            refNumber: Option[String],
                            isSME: Boolean,
                            isVCSE: Boolean)

object ContractSupplier {
  def fromStringFormat(text: String): List[ContractSupplier] = {
    text.split("\\]\\[").map { supplier =>
      val bits = supplier.stripPrefix("[").split("|").map(_.trim())

      def emptyToNone(s: String) = {
        if (s.isEmpty) {
          None
        } else {
          Some(s)
        }
      }

      ContractSupplier(
        bits(0),
        bits(1),
        emptyToNone(bits(2)),
        emptyToNone(bits(3)),
        bits(4).toLowerCase != "no",
        bits(5).toLowerCase != "no"
      )
    }.toList
  }
}

