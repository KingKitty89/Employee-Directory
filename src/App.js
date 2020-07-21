import React from 'react';
import Table from "./components/Table";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <Table />
      </Container>
    </div>
  );
}

export default App;