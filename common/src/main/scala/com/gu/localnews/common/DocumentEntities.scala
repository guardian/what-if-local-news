package com.gu.localnews.common

case class DocumentEntities(
  people: List[String],
  places: List[String],
  organisations: List[String],
  dates: List[String],
  keyPhrases: List[String],
  sentiment: List[String]) {
  def addPerson(person: String) = this.copy(people = this.people :+ person)
  def addPlace(place: String) = this.copy(places = this.places :+ place)
  def addDate(date: String) = this.copy(dates = this.dates :+ date)
  def addOrganisation(organisation: String) = this.copy(organisations = this.organisations :+ organisation)
}



object DocumentEntities {
  def apply(): DocumentEntities = DocumentEntities(Nil, Nil, Nil, Nil, Nil, Nil)
}