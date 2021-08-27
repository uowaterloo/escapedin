import React from "react";
import useApplicationState, { StateContext } from "./util/useApplicationState";
import Layout from "./layout/layout";

function App() {
  const applicationState = useApplicationState();

  return (
    <StateContext.Provider value={applicationState}>
      <Layout />
    </StateContext.Provider>
  );
}

export default App;
