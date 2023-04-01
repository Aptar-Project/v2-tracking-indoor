import { BrowserRouter, Route, Routes } from "react-router-dom";

//STYLESHEETS
import "./App.css";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { RequireAuth } from "./components/requireAuth/RequireAuth";
import { BasePage } from "./pages/basePage/BasePage";
import { MapPage } from "./pages/mapPage/MapPage";
import { TagsPage } from "./pages/tagsPage/TagsPage";
import { SensorPage } from "./pages/sensorsPage/SensorPage";
import { DetailSensorPage } from "./pages/detailSensorPage/DetailSensorPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<BasePage />}>
              <Route path="/" element={<MapPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/sensors" element={<SensorPage />} />
              <Route path="/sensors/:id" element={<DetailSensorPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
