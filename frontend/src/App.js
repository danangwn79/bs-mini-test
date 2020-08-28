import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import ResepsList from "./components/reseps-list.component";
import EditResep from "./components/edit-resep.component.js";
import CreateResep from "./components/create-resep.component.js";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br />
      <Route path="/" exact component={ResepsList} />
      <Route path="/edit/:id" component={EditResep} />
      <Route path="/create" component={CreateResep} />
      </div>
    </Router>
  );
}

export default App;