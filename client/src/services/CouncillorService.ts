import { documents, Document } from "./documents";
import { places, Place } from "./places";
import { people, Person } from "./people";
import { councils, Council } from "./councils";

const network = <T>(val: T): Promise<T> =>
  new Promise(res => setTimeout(() => res(val), Math.random() * 1000));

type Replace<T extends object, O extends object> = Pick<
  T,
  Exclude<keyof T, keyof O>
> &
  O;

export type DocumentWithPeople = Replace<Document, { people: Person[] }>;

export type DocumentWithPeopleAndPlaces = Replace<
  DocumentWithPeople,
  { places: Place[] }
>;
export type PersonWithDocuments = Person & {
  documents: Document[];
};
export type PlaceWithDocumentsAndDocumentPeople = Place & {
  documents: DocumentWithPeople[];
};
export type CouncilWithPeopleAndKeyPhrases = Replace<
  Council,
  {
    people: Person[];
    keyphrases: {
      documentId: string;
      phrase: string;
    }[];
  }
>;

const joinWithPeople = <T extends { people: string[] }>(
  item: T
): T & { people: Person[] } => ({
  ...item,
  people: item.people.map(personId => people[personId])
});

const joinWithPlaces = <T extends { places: string[] }>(
  item: T
): T & { places: Place[] } => ({
  ...item,
  places: item.places.map(placeId => places[placeId])
});

const joinEnitityWithDocs = (person: Person): PersonWithDocuments => ({
  ...person,
  documents: Object.values(documents).filter(doc =>
    doc.people.includes(person.id)
  )
});

const joinPlaceWithFilledDocs = (
  place: Place
): PlaceWithDocumentsAndDocumentPeople => ({
  ...place,
  documents: Object.values(documents)
    .filter(doc => doc.people.includes(place.id))
    .map(joinWithPeople)
});

const searchableFields = ["name", "text"] as ["name", "text"];

const search = ({
  query,
  councilId
}: {
  query?: string;
  councilId?: string;
}): Promise<{ results: DocumentWithPeopleAndPlaces[] }> =>
  network({
    results: Object.values(documents)
      .filter(
        item =>
          (typeof councilId === "undefined" || councilId === item.councilId) &&
          (typeof query === "undefined" ||
            searchableFields.find(field =>
              item[field].toLowerCase().includes(query.toLowerCase())
            ))
      )
      .map(joinWithPeople)
      .map(joinWithPlaces)
  });

const getDocument = (
  id: string
): Promise<{ results?: DocumentWithPeopleAndPlaces }> =>
  network({
    results: joinWithPlaces(joinWithPeople(documents[id]))
  });

const getPerson = (id: string): Promise<{ results?: PersonWithDocuments }> =>
  network({
    results: joinEnitityWithDocs(people[id])
  });

const getCouncil = (
  id: string
): Promise<{ results?: CouncilWithPeopleAndKeyPhrases }> =>
  network({
    results: {
      ...joinWithPeople(councils[id]),
      keyphrases: Object.values(documents)
        .filter(doc => doc.councilId === id)
        .reduce(
          (acc, doc) => [
            ...acc,
            ...doc.keyphrases.map(phrase => ({
              documentId: doc.id,
              phrase
            }))
          ],
          [] as { documentId: string; phrase: string }[]
        )
    }
  });

const getPlace = (
  id: string
): Promise<{ results?: PlaceWithDocumentsAndDocumentPeople }> =>
  network({
    results: joinPlaceWithFilledDocs(places[id])
  });

const searchCouncil = (query: string): Promise<{ results: Council[] }> =>
  network({
    results: Object.values(councils).filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  });

export { search, getDocument, searchCouncil, getCouncil, getPerson, getPlace };
