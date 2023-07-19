import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundP from "./pages/NotFoundP";
import LayoutAdmin from "./components/layout";
import StudentsP from "./pages/StudentsP";
import TeachersP from "./pages/TeachersP";
import LoginPage from "./pages/LoginP";
import DashboardPage from "./pages/DashboardPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<StudentsP />} />
          <Route path="teachers" element={<TeachersP />} />
        </Route>
        <Route path="*" element={<NotFoundP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
