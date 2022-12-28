import React from "react";
import logo from "./logo.svg";
import "./App.css";

const somethingArray = [{greet:"hello"}, {greet:"Wild", name:"45"}, {greet:"Pineapple", name:"34"}];

function App() {
  return (
    <div className="App">
      {somethingArray.map((object) => (
        <div>{object?.name} {object?.greet}</div>
      ))}
    </div>
  );
}

export default App;
