import React, { useRef, useState, useEffect } from "react";
import Mappedin from "@mappedin/mappedin-js/builds/mappedin";

export default function MapManager({
  options,
  onLoad = (x) => x,
  className,
  selectedMap,
}) {
  const elementRef = useRef();
  const [sdkData, setSdkData] = useState(null);

  // Initialize the map on load
  useEffect(() => {
    Mappedin.initialize(options, elementRef.current)
      .then((data) => {
        onLoad(data);
        setSdkData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedMap && sdkData) {
      sdkData.mapview.setMap(selectedMap);
    }
  }, [selectedMap]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
}
