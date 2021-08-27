import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import Mappedin from "@mappedin/mappedin-js/builds/mappedin";

import Keys from "../../../keys";
import Spinner from "../../shared/spinner";
import MappedinMap from "./MappedinMapview";

import Markers from "./markers";

import {
  useSequentialSelections,
  useMarkerManager,
  getLocationForPolygon,
  getPolygonForLocation,
} from "./utils";

import {
  Wrapper,
  Row,
  LoadingScreen,
  StyledStatusBar,
  InterfaceContainer,
} from "./index.style";
import { StateContext, ActionTypes } from "../../util/useApplicationState";

const SelectionOrder = [
  "5b1a820697e366793c000083", //ptolemy
  "5b1a81db97e366793c000081", //mercator
  "5b1a817c97e366793c000080", //da vinci
  "5b1a814f97e366793c00007f", //tomlinson
  "5b1a821c97e366793c000084", //massey
  "5b1a81f097e366793c000082", //ortelius
];

//5f529bb1b20a327b7a000001 values wall
//5f529c43b20a327b7a00000d pet wall
//5b1a84ed97e366793c000091 server room
//5b196e3b97e366793c000007 hongwei's office

export default function MapScreen() {
  const [isFullyLoaded, setFullyLoaded] = React.useState(false);
  const [selectedMap, setSelectedMap] = React.useState(null);
  const [sdkData, setSdkData] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  //const [navigationNodes, setNavigationNodes] = React.useState([]);
  const { dispatch } = useContext(StateContext);

  const history = useHistory();

  const markers = [
    {
      key: "fantasy-wall",
      location: "5fd2799106d5276c37000000",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("fantasy_wall");
          }}
        />
      ),
    },
    {
      key: "values-wall",
      location: "5f529bb1b20a327b7a000001",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("values_wall");
          }}
        />
      ),
    },
    {
      key: "pet-wall",
      location: "5f529c43b20a327b7a00000d",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("pet_wall");
          }}
        />
      ),
    },
    {
      key: "server-room",
      location: "5b1a84ed97e366793c000091",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("door_puzzle");
          }}
        />
      ),
    },
    {
      key: "bookcase",
      location: "5b1a834697e366793c000087",
      component: (
        <Markers.LocationRedirectMarker
          onActivate={() => {
            history.push("bookcase");
          }}
        />
      ),
    },
  ];

  const markerManager = useMarkerManager(
    sdkData?.mapview,
    selectedMap,
    markers,
    isFullyLoaded
  );

  const [sequentialLocations, setSequentialLocations] = useSequentialSelections(
    SelectionOrder
  );

  const options = {
    mapview: {
      antialias: "AUTO", //auto apply antialiasing
      mode: Mappedin.modes.TEST, //automatically test for 3d or 2d mode
      onDataLoaded: () => console.log("Data loaded"),
      onFirstMapLoaded: () => {
        setFullyLoaded(true);
        console.log("fully loaded");
      },
    },
    venue: {
      ...Keys,
      perspective: "Website", //pick the perspective you would like to load
      things: {
        //fetch some data
        venue: ["slug", "name"],
        maps: ["name", "elevation", "shortName"],
      },
      venue: "410-albert",
    },
  };

  const loadingCallback = (data) => {
    setSdkData(data);
    setSelectedMap(data.mapview.currentMap);

    data.mapview.addInteractivePolygonsForAllLocations();
    data.mapview.labelAllLocations();
  };

  const onPolygonClicked = React.useCallback(
    (polygonId) => {
      const location = getLocationForPolygon(polygonId, sdkData.mapview);

      sdkData.mapview.clearAllPolygonColors();
      setSelectedLocation(location.id);
      setSequentialLocations(location.id);
    },
    [sdkData, selectedMap]
  );

  //Respond to update of sequential locations
  React.useEffect(() => {
    if (sdkData && sequentialLocations.length > 0) {
      sequentialLocations.forEach((locationID) => {
        const polygon = getPolygonForLocation(locationID, sdkData.mapview);
        if (polygon) {
          sdkData.mapview.setPolygonColor(polygon, 0xbf4320);
        }
      });

      if (sequentialLocations.length === SelectionOrder.length) {
        history.push("sphinx_code");
        dispatch({ type: ActionTypes.completePuzzle, payload: "MEETING_ROOM" });
      }
    }
  }, [sequentialLocations, sdkData, selectedMap]);

  //Avoid a stale closure by wrapping the function assignment in a useEffect and callback function in useCallback
  React.useEffect(() => {
    if (sdkData && sdkData.mapview) {
      sdkData.mapview.onPolygonClicked = onPolygonClicked;
    }
  }, [sdkData, onPolygonClicked]);

  return (
    <Wrapper key="map-container">
      <StyledStatusBar />
      {!isFullyLoaded && (
        <LoadingScreen>
          <Spinner />
        </LoadingScreen>
      )}

      <MappedinMap
        selectedMap={selectedMap}
        options={options}
        onLoad={loadingCallback}
      />
    </Wrapper>
  );
}
