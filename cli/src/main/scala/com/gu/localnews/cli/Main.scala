package com.gu.localnews.cli

import java.util.concurrent.Executors

import com.gu.localnews.cli.parsers.{
  ContractParser,
  PlanningApplicationParser,
  PetitionParser
}
import com.gu.localnews.common.services.index.{Index, ElasticsearchClient}

import scala.concurrent.ExecutionContext
import scala.concurrent.Future

object Main extends App {
  import scala.language.reflectiveCalls

  implicit val ec =
    ExecutionContext.fromExecutor(Executors.newFixedThreadPool(2))

  val client = ElasticsearchClient(List("http://127.0.0.1:9200"))

  val options = new Args(args)

  val futures = options.`type`() match {
    case ImportType.CouncilContracts =>
      // Setup first time IS THIS RIGHT?
      val index = new Index(client)
      index.setupCouncilContracts()
      val contracts = ContractParser.parse(options.file())
      val total = contracts.length
      var i = 0

      contracts.map { c =>
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

      apps.map { a =>
        i += 1
        println(s"$i/$total")
        index.insertPlanningApplications(a)
      }

    case ImportType.CouncilPetitions =>
      val index = new Index(client)
      index.setupCouncilPetitions()
      val petitions = PetitionParser.parse(options.file())

      petitions.map { p =>
        index.insertCouncilPetitions(p)
      }

    case _ => List(Future.successful(()))
  }

  Future.sequence(futures).onComplete((_) => System.exit(0))
}
