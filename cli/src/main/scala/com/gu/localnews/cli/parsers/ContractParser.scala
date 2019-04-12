package com.gu.localnews.cli.parsers

import java.io.File

import com.github.tototoshi.csv._
import com.gu.localnews.cli.services.NLP
import com.gu.localnews.common.{ContractSupplier, CouncilContract, DocumentEntities}

object ContractParser {
  def parse(file: File): List[CouncilContract] = {
    def readFromMap(header: String, row: Map[String, String]) = {
      Option(row(header).trim).filter(_.nonEmpty)
    }

    val reader = CSVReader.open(file)

    reader.allWithHeaders().map { row =>
      val org = row("Organisation Name")
      val suppliers = readFromMap("Supplier [Name|Address|Ref type|Ref Number|Is SME|Is VCSE]", row).map(ContractSupplier.fromStringFormat)

      var entities = suppliers match {
        case Some(s) => s.foldLeft(DocumentEntities().addOrganisation(org)) { (acc, supplier) =>
          acc.addOrganisation(supplier.name)
        }
        case None => DocumentEntities().addOrganisation(org)
      }

      entities = NLP.mergeEntities(entities, NLP.process(row("Description")))

      CouncilContract(
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
