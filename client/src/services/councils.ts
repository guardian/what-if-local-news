import { MapData, mapData } from "./MapData";

export type Council = {
  id: string;
  name: string;
  people: string[];
  mapData: MapData;
};

const councils: { [id: string]: Council } = {
  "1": {
    id: "1",
    name: "Royal Borough of Kensington and Chelsea",
    people: ["1", "3"],
    mapData: mapData.rbkc
  },
  "2": {
    id: "2",
    name: "Lambeth",
    people: ["2"],
    mapData: mapData.lambeth
  },
  "3": {
    id: "3",
    name: "Health data",
    people: [],
    mapData: mapData.rbkc
  }
};

export { councils };
