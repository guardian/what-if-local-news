const placeRoute = (place: { id: string }) => `/place/${place.id}`;
const documentRoute = (doc: { id: string }) => `/document${doc.id}`;
const personRoute = (person: { id: string }) => `/person/${person.id}`;

export { placeRoute, documentRoute, personRoute };
