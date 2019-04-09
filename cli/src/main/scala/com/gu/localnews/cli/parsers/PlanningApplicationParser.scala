package com.gu.localnews.cli.parsers

import java.io.File

import com.github.tototoshi.csv.CSVReader
import com.gu.localnews.common.{DocumentEntities, PlanningApplication}

object PlanningApplicationParser {

  def parse(file: File): List[PlanningApplication] = {
    def readFromMap(header: String, row: Map[String, String]) = {
      Option(row(header).trim).filter(_.nonEmpty)
    }

    val reader = CSVReader.open(file)

    reader.allWithHeaders().map { row =>

      val name = readFromMap("applicant-name", row)
      val company = readFromMap("applicant-company", row)
      val address = row("address")
      val dateReceived = row("date-received")

      val entities = DocumentEntities()

      name match {
        case Some(n) => entities.addPerson(n)
        case None => _
      }
      company match {
        case Some(c) => entities.addOrganisation(c)
        case None => _
      }
      entities.addPlace(address)
      entities.addDate(dateReceived)

      PlanningApplication(
        address,
        row("case-reference"),
        readFromMap("conservation-area", row),
        name,
        company,
        readFromMap("application-type", row),
        row("application-link"),
        row("proposal"),
        dateReceived,
        row("status"),
        entities
      )
    }
  }
}


