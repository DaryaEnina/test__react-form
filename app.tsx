import React from "react";
import Header from "./app/components/header";
import "./app.sass";
import { Route, Routes } from "react-router-dom";
import Welcome from "./app/pages/welcome";
import Form from "./app/pages/form";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/" element={<Welcome />}></Route>
      </Routes>
    </>
  );
};

export default App;
