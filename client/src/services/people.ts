export type Person = {
  id: string;
  name: string;
};

const people: { [id: string]: Person } = {
  "1": {
    id: "1",
    name: "Richard Beddington"
  },
  "2": {
    id: "2",
    name: "Bob the Builder"
  },
  "3": {
    id: "3",
    name: "James Joyce"
  }
};

export { people };
