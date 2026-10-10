import { Routes, Route } from "react-router-dom";

import MainMenu from "./pages/MainMenu/MainMenu.tsx";
import Finder from "./pages/Finder/Finder.tsx";
import TeamBuilder from "./pages/TeamBuilder/TeamBuilder.tsx";
import Collector from "./pages/Collector/Collector.tsx";
import Collection from "./pages/Collection/Collection.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />

      <Route path="/finder" element={<Finder />} />

      <Route path="/team-builder" element={<TeamBuilder />} />

      <Route path="/collector" element={<Collector />} />

      <Route path="/collection" element={<Collection />} />
    </Routes>
  );
}

export default App;