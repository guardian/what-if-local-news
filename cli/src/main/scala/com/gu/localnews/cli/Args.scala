package com.gu.localnews.cli

import java.io.File

import enumeratum._
import org.rogach.scallop.{DefaultConverters, ScallopConf, ValueConverter}

sealed trait ImportType extends EnumEntry

object ImportType extends CliEnum[ImportType] {
  val values = findValues

  case object CouncilContracts extends ImportType
}

class Args(args: Seq[String]) extends ScallopConf(args) {
  val `type` = opt[ImportType](name = "type", noshort = true, required = true, descr = s"The type of this file, can be one of: ${ImportType.values.mkString(", '")}")

  val file = trailArg[File]()
  verify()
}

trait CliEnum[A <: EnumEntry] extends Enum[A] with DefaultConverters {
  implicit val converter: ValueConverter[A] = singleArgConverter(withNameInsensitive)
}
