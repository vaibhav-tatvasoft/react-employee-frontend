import logo from "./logo.svg";
import "./App.css";
import APIElement from "./components/APIElement";
import SwaggerLikeUI from "./components/SwaggerLikeUI";
import APIRequestBody from "./components/APIRequestBody";
import APIHeaders from "./components/APIHeaders";
import APIResponseBody from "./components/APIResponseBody";

function App() {
  return (
    <div className="SwaggerUI">
      <APIElement httpMethod="GET" />
      <APIElement httpMethod="POST" />
      <APIElement httpMethod="DELETE" />
      <APIElement httpMethod="PATCH" />
    </div>
  );
}

export default App;
