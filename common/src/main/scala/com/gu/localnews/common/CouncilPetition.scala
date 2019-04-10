package com.gu.localnews.common

case class CouncilPetition( title: String,
                            petitionLink: String,
                            description: Option[String],
                            backgroundInfo: Option[String],
                            closingDate: String, //make date
                            creator: String,
                            signatures: Option[List[PetitionSignature]],
                            entities: DocumentEntities
                            )
