package com.gu.localnews.cli.parsers

import java.io.File

import com.github.tototoshi.csv.CSVReader
import com.gu.localnews.cli.services.NLP
import com.gu.localnews.common.{CouncilPetition, DocumentEntities, PetitionSignature}

object PetitionParser {

  def parse(file: File): List[CouncilPetition] = {
    def readFromMap(header: String, row: Map[String, String]) = {
      Option(row(header).trim).filter(_.nonEmpty)
    }

    val reader = CSVReader.open(file)

    reader.allWithHeaders().map { row =>

      val description = readFromMap("petition-description", row)
      val backgroundInfo = readFromMap("petition-background-info", row)
      val creator = row("petition-creator")
      val signatures = readFromMap("petition-signatures", row).map(PetitionSignature.fromStringFormat)


      var entities = signatures match {
        case Some(s) => s.foldLeft(DocumentEntities().addPerson(creator)){(acc, signature) =>
          acc.addPerson(signature.name)
        }
        case None => DocumentEntities().addPerson(creator)
      }

      entities = NLP.mergeEntities(entities, NLP.process(row("petition-description")))
      entities = NLP.mergeEntities(entities, NLP.process(row("petition-background-info")))

      CouncilPetition(
        row("petition"),
        row("petition-href"),
        description,
        backgroundInfo,
        row("petition-closing-date"),
        creator,
        signatures,
        entities
      )
    }
  }
}


