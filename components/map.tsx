"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useCallback, useEffect, useMemo, useRef } from "react";

// console.log(process.env.MAP_API_MAP)
export default function Map({
  center,
  markerPosition,
}: {
  center: { lat: number; lng: number } | undefined;
  markerPosition?: { lat: number; lng: number };
}) {
  const mapRef = useCallback(
    (node: HTMLDivElement | null) => {
      let map;
      const loader = new Loader({
        apiKey: process.env.MAP_API_KEY ?? "",
        version: "weekly",
        // ...additionalOptions,
      });

      if (node !== null && center) {
        console.log(node);
        loader.importLibrary("maps").then(async () => {
          const { Map } = (await google.maps.importLibrary(
            "maps",
          )) as google.maps.MapsLibrary;
          //@ts-ignore
          const { Marker } = (await google.maps.importLibrary(
            "marker",
          )) as google.maps.MarkerLibrary;
          map = new Map(node, {
            center,
            zoom: 15,
          });

          new Marker({
            map: map,
            position: markerPosition,
            title: "Uluru",
          });
        });
      }
    },
    [center, markerPosition],
  );

  return <div className="h-[600px] w-[680px]" ref={mapRef}></div>;
}
