import logo from "./logo.svg";
import "./App.css";
import APIElement from "./components/APIElement";
import SwaggerLikeUI from "./components/SwaggerLikeUI";
import APIRequestBody from "./components/APIRequestBody";
import APIHeaders from "./components/APIHeaders";
import APIResponseBody from "./components/APIResponseBody";
import Home from "./components/Home";
import EmployeeForm from "./components/EmployeeForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
