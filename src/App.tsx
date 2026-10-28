import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout.tsx";
import MainMenu from "./pages/MainMenu/MainMenu.tsx";
import Finder from "./pages/Finder/Finder.tsx";
import TeamBuilder from "./pages/TeamBuilder/TeamBuilder.tsx";
import Collector from "./pages/Collector/Collector.tsx";
import Collection from "./pages/Collection/Collection.tsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainMenu />} />

        <Route path="/finder" element={<Finder />} />

        <Route path="/team-builder" element={<TeamBuilder />} />

        <Route path="/collector" element={<Collector />} />

        <Route path="/collection" element={<Collection />} />
      </Route>
    </Routes>
  );
}

export default App;
