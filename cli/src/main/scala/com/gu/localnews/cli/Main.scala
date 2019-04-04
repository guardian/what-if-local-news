package com.gu.localnews.cli

import com.gu.localnews.cli.parsers.ContractParser


object Main extends App {
  import scala.language.reflectiveCalls

  val options = new Args(args)

  options.`type`() match {
    case ImportType.CouncilContracts =>
      val contracts = ContractParser.parse(options.file())
      contracts.foreach { c => println(c)}
    case _ =>
  }
}