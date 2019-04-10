export type Document = {
  id: string;
  date: number;
  councilId: string;
  name: string;
  src: string;
  mimeType: string;
  type: string;
  text: string;
  people: string[];
  places: string[];
  keyphrases: string[];
};

const documents: { [id: string]: Document } = {
  "1": {
    id: "1",
    date: Date.now(),
    councilId: "1",
    name: "Candy cane house",
    src: "/example-pdfs/helloworld.pdf",
    text: "Someone painted their house funny colors",
    people: ["1", "3"],
    places: ["1"],
    mimeType: "application/pdf",
    type: "Planning application",
    keyphrases: ["funny colors"]
  },
  "2": {
    id: "2",
    date: Date.now(),
    councilId: "2",
    name: "Playground",
    src: "/example-pdfs/helloworld.pdf",
    text:
      "A developer denied access to a new playground for the social housing tenants",
    people: ["2"],
    places: ["2"],
    mimeType: "application/pdf",
    type: "Planning application",
    keyphrases: ["A developer denied access"]
  },
  "3": {
    id: "3",
    date: Date.now(),
    councilId: "1",
    name: "Flammable cladding",
    src: "/example-pdfs/helloworld.pdf",
    text: "discussion on flammable cladding for tower blocks",
    people: [],
    places: ["3"],
    mimeType: "application/pdf",
    type: "Council minutes",
    keyphrases: ["flammable cladding"]
  },
  "4": {
    id: "4",
    date: Date.now(),
    councilId: "1",
    name: "House rejection",
    src: "/example-pdfs/helloworld.pdf",
    text: "We disagree with the house",
    people: ["1", "3"],
    places: ["1"],
    mimeType: "application/pdf",
    type: "Planning dispute",
    keyphrases: ["We disagree"]
  }
};

export { documents };
