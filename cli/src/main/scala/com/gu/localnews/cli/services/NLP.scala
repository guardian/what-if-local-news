package com.gu.localnews.cli.services

import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Paths

import com.gu.localnews.common.DocumentEntities
import play.api.libs.json.{JsObject, Json}

import scala.sys.process._

case class NlpValue(Text: String, Type: String)
case class NlpText(Text: String)
case class NlpResults(DataSource: String,
                      People: Option[List[NlpValue]],
                      Places: Option[List[NlpValue]],
                      Dates: Option[List[NlpValue]],
                      Organisation: Option[List[NlpValue]],
                      KeyPhrases: Option[List[NlpText]])

object NLP {
  var analyser: Option[String] = None

  implicit val vFormat = Json.format[NlpValue]
  implicit val tFormat = Json.format[NlpText]
  implicit val rFormat = Json.format[NlpResults]

  def process(text: String): NlpResults = {
    analyser match {
      case Some(analyserPath) =>
        if (text.length == 0) {
          NlpResults("", None, None, None, None, None)
        } else {
         val in = Files.createTempFile("harvest_nlp_in_", ".txt")
          val out = Files.createTempFile("harvest_nlp_out_", ".json")

          Files.write(in, text.getBytes(StandardCharsets.UTF_8))

          s"aws s3 cp ${in.toAbsolutePath.toString} s3://whatif-local-news-le/${in.getFileName.toString} --profile developerPlayground".!!

          // God will judge me in the afterlife
          s"$analyserPath -input ${in.getFileName.toString} -output ${out.toAbsolutePath.toString} | grep -v 'null' ${out.toAbsolutePath.toString} > ${out.toAbsolutePath.toString}".!!

          val jsonString = new String(Files.readAllBytes(out))

          Json.parse(jsonString).validate[NlpResults].get
        }
      case _ => throw new Exception("Analyser not set")
    }
  }

  def mergeEntities(current: DocumentEntities, nlp: NlpResults): DocumentEntities = {
    var ohGodImSoSorry = current

    nlp.Organisation.foreach(_.map { org =>
      org.Text
    }.foreach { org =>
      ohGodImSoSorry = ohGodImSoSorry.addOrganisation(org)
    })

    nlp.Dates.foreach(_.map { date =>
      date.Text
    }.foreach { date =>
      ohGodImSoSorry = ohGodImSoSorry.addDate(date)
    })

    nlp.People.foreach(_.map { person =>
      person.Text
    }.foreach { person =>
      ohGodImSoSorry = ohGodImSoSorry.addPerson(person)
    })

    nlp.Places.foreach(_.map { place =>
      place.Text
    }.foreach { place =>
      ohGodImSoSorry = ohGodImSoSorry.addPlace(place)
    })

    ohGodImSoSorry
  }
}
