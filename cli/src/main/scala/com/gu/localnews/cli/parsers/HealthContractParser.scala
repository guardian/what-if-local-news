package com.gu.localnews.cli.parsers

import java.io.File

import com.github.tototoshi.csv.CSVReader
import com.gu.localnews.common.{ContractSupplier, HealthContract, DocumentEntities}

object HealthContractParser {
  def parse(file: File): List[HealthContract] = {
    def readFromMap(header: String, row: Map[String, String]) = {
      Option(row(header).trim).filter(_.nonEmpty)
    }

    val reader = CSVReader.open(file)

    reader.allWithHeaders().map { row =>
      val org = row("Organisation Name")
      val suppliers = readFromMap("Supplier [Name|Address|Ref type|Ref Number|Is SME|Is VCSE]", row).map(ContractSupplier.fromStringFormat)

      val entities = suppliers match {
        case Some(s) => s.foldLeft(DocumentEntities().addOrganisation(org)) { (acc, supplier) =>
          acc.addOrganisation(supplier.name)
        }
        case None => DocumentEntities().addOrganisation(org)
      }

      HealthContract(
        row("Title"),
        org,
        row("Description"),
        row("Published Date"),
        row("Status"),
        readFromMap("Value Low", row).map(_.toFloat),
        readFromMap("Value High", row).map(_.toFloat),
        readFromMap("Awarded Date", row),
        readFromMap("Awarded Value", row).map(_.toFloat),
        suppliers,
        entities
      )
    }
  }

}
