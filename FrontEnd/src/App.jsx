import { BrowserRouter, Routes, Route } from "react-router-dom";

import Applications from "./Components/Applications";
import Admin from "./Components/Admin";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
       
       
        <Route path="/" element={<Applications />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;