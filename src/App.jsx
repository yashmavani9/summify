import React from "react";
import Hero from "./components/Hero";
import Demo from "./components/Demo";

import "./App.css";

const App = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <main>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <div className="app">
          <Hero />
          <Demo />
        </div>
      </main>
      <footer className="opacity-90 text-center pt-8 pb-6">
        <h2 className="desc2">
          <span className="desc22"><a href="https://yashmavani.framer.website/">Yash Mavani</a></span> Production
        </h2>
      </footer>
    </div>
  );
};

export default App;
