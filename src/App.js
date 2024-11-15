import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes
import CarList from "./component/CarList";
import CarDetail from "./component/CarDetail";
import Login from "./component/Login";
import SignUp from "./component/Signup";
import CarForm from "./component/CarForm"; // Import the CarForm component

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <h1>Car Management Application</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product-list" element={<CarList />} />
          <Route path="/product/:id/edit" element={<CarForm isEdit={true} />} />
          <Route path="/product/:id" element={<CarDetail />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
