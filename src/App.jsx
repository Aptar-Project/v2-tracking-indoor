import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

//STYLESHEETS
import "./App.css";
import { LoginPage } from "./pages/loginPage/LoginPage";
import { RequireAuth } from "./components/requireAuth/RequireAuth";
import { BasePage } from "./pages/basePage/BasePage";
import { MapPage } from "./pages/mapPage/MapPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<BasePage />}>
              <Route path="/" element={<MapPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
