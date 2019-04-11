package com.gu.localnews.common

import com.gu.localnews.common.model.ResourceFields
import play.api.libs.json.Json

case class CouncilPetition( title: String,
                            petitionLink: String,
                            description: Option[String],
                            backgroundInfo: Option[String],
                            closingDate: String, //make date
                            creator: String,
                            signatures: Option[List[PetitionSignature]],
                            entities: DocumentEntities
                            ) extends ResourceFields

object CouncilPetition {
  implicit val format = Json.format[CouncilPetition]
}