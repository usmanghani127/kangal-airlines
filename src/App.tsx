import React from 'react';
import './App.css';
import SearchFlights from "./Views/Search";
import {Container} from "@mui/material";

const App = () => {
  return (
    <Container>
      <SearchFlights />
    </Container>
  );
}

export default App;
