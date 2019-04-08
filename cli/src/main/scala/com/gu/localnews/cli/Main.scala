package com.gu.localnews.cli

import java.util.concurrent.Executors

import com.gu.localnews.cli.parsers.ContractParser
import com.gu.localnews.common.services.index.{Index, ElasticsearchClient}

import scala.concurrent.ExecutionContext


object Main extends App {
  import scala.language.reflectiveCalls

  implicit val ec = ExecutionContext.fromExecutor(Executors.newFixedThreadPool(2))

  val client = ElasticsearchClient(List("http://127.0.0.1:9200"))
  val index = new Index(client)

  // Setup first time
  index.setupCouncilContracts()

  val options = new Args(args)

  options.`type`() match {
    case ImportType.CouncilContracts =>
      val contracts = ContractParser.parse(options.file())
      val total = contracts.length
      var i = 0

      contracts.foreach { c =>
        i += 1
        println(s"$i/$total")
        index.insertCouncilContracts(c)
      }
    case _ =>
  }
}