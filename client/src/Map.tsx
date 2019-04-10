import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { API_KEY } from "./constants/mapbox";
import { MapData } from "./services/MapData";

type MapProps = {
  mapData: MapData;
};

const Map = ({ mapData }: MapProps) => {
  const ref = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    const { current } = ref;
    if (!current) return;
    const map = L.map(current, {
      center: mapData.center,
      zoom: mapData.zoom
    });
    L.tileLayer(
      `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${API_KEY}`,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18
      }
    ).addTo(map);
    L.geoJSON(mapData.geoJSON).addTo(map);
  }, []);

  return (
    <div style={{ width: "100%", paddingTop: "100%", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          height: "100%",
          left: 0,
          top: 0,
          width: "100%"
        }}
        ref={ref}
      />
    </div>
  );
};

export default Map;
