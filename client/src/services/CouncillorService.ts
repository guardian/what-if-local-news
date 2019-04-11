import { Document } from "./documents";
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
    keyphrases: string[];
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

// const joinEnitityWithDocs = (person: Person): PersonWithDocuments => ({
//   ...person,
//   documents: Object.values(documents).filter(doc =>
//     doc.people.includes(person.id)
//   )
// });

// const joinPlaceWithFilledDocs = (
//   place: Place
// ): PlaceWithDocumentsAndDocumentPeople => ({
//   ...place,
//   documents: Object.values(documents)
//     .filter(doc => doc.people.includes(place.id))
//     .map(joinWithPeople)
// });

type AggregateData = {
  key: string;
  count: number;
};

type Aggregates = {
  significant_sentiment: AggregateData[];
  significant_key_phrases: AggregateData[];
  significant_people: AggregateData[];
  significant_dates: AggregateData[];
  significant_organisations: AggregateData[];
  significant_places: AggregateData[];
};

export type SearchResponse = {
  hits: Document[];
  aggs: Aggregates;
};

const search = ({
  query,
  tags
}: {
  query: string;
  tags: string[];
}): Promise<SearchResponse> =>
  fetch(
    `/api/search?q=${[query, ...tags]
      .filter(Boolean)
      .map(t => `(${t})`)
      .join("AND")}`
  ).then(res => res.json());

const getDocument = (id: string): Promise<{ results?: Document }> =>
  network({}); // todo implement

const getPerson = (id: string): Promise<{ results?: Person }> =>
  network({
    results: people[id]
  });

const getCouncil = (
  id: string
): Promise<{ results?: CouncilWithPeopleAndKeyPhrases }> =>
  network({
    results: {
      ...joinWithPeople(councils[id]),
      keyphrases: ["heat"]
    }
  });

const getPlace = (id: string): Promise<{ results?: Place }> =>
  network({
    results: places[id]
  });

const searchCouncil = (query: string): Promise<{ results: Council[] }> =>
  network({
    results: Object.values(councils).filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
  });

export { search, getDocument, searchCouncil, getCouncil, getPerson, getPlace };
