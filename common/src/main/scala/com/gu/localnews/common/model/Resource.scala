package com.gu.localnews.common.model

import com.gu.localnews.common._
import play.api.libs.json._

case class Resource(id: String, index: String, title: String, fields: ResourceFields)
trait ResourceFields

object ResourceFields {
  implicit def writes = new Writes[ResourceFields] {
    override def writes(o: ResourceFields): JsValue = o match {
      case x: CouncilContract => CouncilContract.format.writes(x)
      case x: CouncilPetition => CouncilPetition.format.writes(x)
      case x: PlanningApplication => PlanningApplication.format.writes(x)
    }
  }
}

object Resource {
  implicit def writes = Json.writes[Resource]

  def fromMap(index: String, id: String, map: Map[String, AnyRef]) = {
    def extractEntites(map: Map[String, AnyRef]): DocumentEntities = {
      val ents= map("entities").asInstanceOf[Map[String, List[String]]]
      DocumentEntities(
        ents("people"),
        ents("places"),
        ents("organisations"),
        ents("dates"),
        ents("keyPhrases"),
        ents("sentiment")
      )
    }

    val fields = index match {
      case "council-contracts" =>
        CouncilContract(
          map("title").asInstanceOf[String],
          map("organisationName").asInstanceOf[String],
          map("description").asInstanceOf[String],
          map("publishedDate").asInstanceOf[String], // Make date field?
          map("status").asInstanceOf[String],
          map.get("valueLow").map(_.asInstanceOf[Double]),
          map.get("valueHigh").map(_.asInstanceOf[Double]),
          map.get("awardedDate").map(_.asInstanceOf[String]), // Make date fields?
          map.get("awardedValue").map(_.asInstanceOf[Double]),
          map.get("suppliers").map { suppliers =>
            suppliers.asInstanceOf[List[Map[String, AnyRef]]].map { supplier =>
              ContractSupplier(
                supplier("name").asInstanceOf[String],
                supplier("address").asInstanceOf[String],
                supplier.get("refType").map(_.asInstanceOf[String]),
                supplier.get("refNumber").map(_.asInstanceOf[String]),
                supplier("isSME").asInstanceOf[Boolean],
                supplier("isVCSE").asInstanceOf[Boolean]
              )
            }
          },
          extractEntites(map)
        )
      case "council-petitions" =>
        CouncilPetition(
          map("title").asInstanceOf[String],
          map("petitionLink").asInstanceOf[String],
          map.get("description").map(_.asInstanceOf[String]),
          map.get("backgroundInfo").map(_.asInstanceOf[String]),
          map("closingDate").asInstanceOf[String],
          map("creator").asInstanceOf[String],
          map.get("signatures").map(_.asInstanceOf[List[String]].map(PetitionSignature.apply)),
          extractEntites(map)
        )
      case "planning-applications" =>
        PlanningApplication(
          map("address").asInstanceOf[String],
          map("caseRef").asInstanceOf[String],
          map.get("conservationArea").map(_.asInstanceOf[String]),
          map.get("applicantName").map(_.asInstanceOf[String]),
          map.get("applicantCompany").map(_.asInstanceOf[String]),
          map.get("applicantType").map(_.asInstanceOf[String]),
          map.get("applicantLink").map(_.asInstanceOf[String]),
          map("proposal").asInstanceOf[String],
          map("dateReceived").asInstanceOf[String],
          map("status").asInstanceOf[String],
          extractEntites(map)
        )
    }
    
    val title = index match {
      case "council-contracts" =>
        map("title").asInstanceOf[String]
      case "council-petitions" =>
        map("title").asInstanceOf[String]
      case "planning-applications" =>
        map("proposal").asInstanceOf[String]
    }

    Resource(index, id, title, fields)
  }
}

