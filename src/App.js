import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./componen/Footer";
import Home from "./componen/Home";
import Login from "./componen/Login";
import DataPerumahan from "./componen/DataPerumahan";
import DataRusun from "./componen/DataRusun";
import InformasiDasarHukum from "./componen/InformasiDasarHukum";
import Register from "./componen/Register";
import PetaPerumahan from "./componen/PetaPerumahan";

import { DataRecapPages } from "./pages/DataRecapPages";
import { QuestionnaireFormPages } from "./pages/QuestionnaireFormPages";
import { AdminDashboardPages } from "./pages/AdminDashboardPages";
import { SurveyorDashboardPages } from "./pages/SurveyorDashboardPages";
import { UploadFotoPages } from "./pages/UploadFotoPages";


function App () {
return (
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/data-perumahan" element={<DataPerumahan />} />
        <Route path="/data-rusun" element={<DataRusun />} />
        <Route path="/peta-perumahan" element={<PetaPerumahan />} />
        <Route path="/informasi-dasar-hukum" element={<InformasiDasarHukum />} />

        <Route path="/admin/dashboard" element={<AdminDashboardPages />} />
        <Route path="/surveyor/dashboard" element={<SurveyorDashboardPages />} />
        <Route path="/questionnaire" element={<QuestionnaireFormPages />} />
        <Route path="/recap" element={<DataRecapPages />} />
        <Route path="/questionnaire/:id" element={<QuestionnaireFormPages />} />
        <Route path="/upload" element={<UploadFotoPages />} />
  </Routes>
  <Footer />
  </BrowserRouter>
)
}

export default App;