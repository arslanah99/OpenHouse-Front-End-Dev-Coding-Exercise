import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import * as ReactBootStrap from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <div>
        {/* navbar to render open house image */}
        <nav>
          <ReactBootStrap.Navbar bg="light">
            <ReactBootStrap.Navbar.Brand href="https://openhouse.ai/">
              <img
                src="https://openhouse.ai/wp-content/uploads/2019/11/OPENHOUSE-ai-logo-Horz-purple-RGB-HR.png"
                height="48px"
                alt="Openhouse logo"
              />
            </ReactBootStrap.Navbar.Brand>
          </ReactBootStrap.Navbar>
        </nav>
        {/* returning dashboard component */}
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
