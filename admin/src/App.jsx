import React from "react";
import Navbar from "./components/Navbar/Navbar"; // Adjusted path
import Sidebar from "./components/Sidebar/Sidebar"; // Adjusted path

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
