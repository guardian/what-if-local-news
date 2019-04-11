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

export type AggregateData = {
  key: string;
  count: number;
};

export type Aggregates = {
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

const ES_SPECIAL_CHARS = [
  `&`,
  `|`,
  `!`,
  `(`,
  `)`,
  `{`,
  `}`,
  `[`,
  `]`,
  `^`,
  `"`,
  `~`,
  `*`,
  `?`,
  `:`
];

const esre = new RegExp(
  `(${ES_SPECIAL_CHARS.map(c => `\\${c}`).join("|")})`,
  "g"
);

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
      .map(t => `"${t.replace(esre, "\\$1")}"`)
      .join(" AND ")}`
  ).then(res => res.json());

const getDocument = (id: string): Promise<{ results?: Document }> =>
  network({}); // todo implement

const getPerson = (id: string): Promise<{ results?: Person }> =>
  network({
    results: people[id]
  });

const getCouncil = (id: string): Promise<{ results?: Council }> =>
  network({
    results: councils[id]
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
