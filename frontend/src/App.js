import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { Layout } from "./components/layout/Layout";

// Pages
import HomePage from "./pages/HomePage";
import MobilitaetPage from "./pages/MobilitaetPage";
import ArchitekturRaumPage from "./pages/ArchitekturRaumPage";
import MarkenkommunikationPage from "./pages/MarkenkommunikationPage";
import DesignKonzeptePage from "./pages/DesignKonzeptePage";
import ProjektmanagementPage from "./pages/ProjektmanagementPage";
import ProjektePage from "./pages/ProjektePage";
import KontaktPage from "./pages/KontaktPage";
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import AGBPage from "./pages/AGBPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mobilitaet" element={<MobilitaetPage />} />
          <Route path="/architektur-raum" element={<ArchitekturRaumPage />} />
          <Route path="/markenkommunikation" element={<MarkenkommunikationPage />} />
          <Route path="/design-konzepte" element={<DesignKonzeptePage />} />
          <Route path="/projektmanagement" element={<ProjektmanagementPage />} />
          <Route path="/projekte" element={<ProjektePage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/agb" element={<AGBPage />} />
        </Routes>
      </Layout>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
