import "./App.css";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import WelcomeMessage from "./components/WelcomeMessage";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
      <UserProfile
        name="Sandrah"
        age="19"
        bio="I love Jesus and i greatly enjoy reading"
      />
    </>
  );
}

export default App;
