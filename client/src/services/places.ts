export type Place = {
  id: string;
  name: string;
};

const places: { [id: string]: Place } = {
  "1": {
    id: "1",
    name: "Ansdell Terrace"
  },
  "2": {
    id: "2",
    name: "Lambeth flats"
  },
  "3": {
    id: "3",
    name: "ABC Tower"
  }
};

export { places };
