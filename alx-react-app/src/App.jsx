import "./App.css";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import WelcomeMessage from "./components/WelcomeMessage";

function App() {
  return (
    <>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
