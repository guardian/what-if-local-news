package com.gu.localnews.cli

import java.util.concurrent.Executors

import com.gu.localnews.cli.parsers.{ContractParser, PlanningApplicationParser}
import com.gu.localnews.common.services.index.{Index, ElasticsearchClient}

import scala.concurrent.ExecutionContext


object Main extends App {
  import scala.language.reflectiveCalls

  implicit val ec = ExecutionContext.fromExecutor(Executors.newFixedThreadPool(2))

  val client = ElasticsearchClient(List("http://127.0.0.1:9200"))

  val options = new Args(args)

  options.`type`() match {
    case ImportType.CouncilContracts =>

      // Setup first time IS THIS RIGHT?
      val index = new Index(client)
      index.setupCouncilContracts()
      val contracts = ContractParser.parse(options.file())
      val total = contracts.length
      var i = 0

      contracts.foreach { c =>
        i += 1
        println(s"$i/$total")
        index.insertCouncilContracts(c)
      }
    case ImportType.PlanningApplications =>

      // Setup first time IS THIS RIGHT?
      val index = new Index(client)
      index.setupPlanningApplications()
      val apps = PlanningApplicationParser.parse(options.file())
      val total = apps.length
      var i = 0

      apps.foreach { a =>
        i += 1
        println(s"$i/$total")
        index.insertPlanningApplications(a)
      }

    case _ =>
  }
}