// src/APIDocumentation.js
import React, { useState, useRef } from "react";
import "./APIElement.css"; // Import the CSS file
import APIHeaders from "./APIHeaders";
import APIRequestBody from "./APIRequestBody";
import APIResponseBody from "./APIResponseBody";

const APIElement = (props) => {
  const formRef = useRef();
  const [response, setResponse] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const formObj = Object.fromEntries(formData.entries());

    const headers = formObj.header;
    const requestBody = formObj.requestBody
      ? JSON.parse(formObj.requestBody)
      : {};

    //console.log(formObj);
    switch (props.httpMethod) {
      case "GET":
        getAllEmployees(headers);
        break;
      case "POST":
        postAllEmployees(headers, requestBody);
        break;
      case "DELETE":
        deleteEmployeeById(requestBody);
        break;
      case "PATCH":
        updateEmployeeById(headers, requestBody);
        break;
    }

    function getAllEmployees(header) {
      fetch("http://localhost:5110/api/Test")
        .then((response) => {
          if (!response.ok) {
            console.log("error occured");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setResponse(data);
        });
    }
    function postAllEmployees(header, request) {
      console.log("request body: " + request);
      fetch("http://localhost:5110/api/Test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error occured");
          }
          //console.log(response.text());
          return response.text();
        })
        .then((data) => {
          console.log("resposeBody: " + data);
          setResponse(data);
        });
    }
    function updateEmployeeById(header, request) {
      let url = "http://localhost:5110/api/Test/" + header;
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error occured");
          }
          return response.json();
        })
        .then((data) => {
          console.log("responseBody: " + data);
          setResponse(data);
        });
    }
    function deleteEmployeeById(request) {
      fetch("http://localhost:5110/api/Test", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error occured");
          }
          return response.text();
        })
        .then((data) => {
          console.log("responseBody: " + data);
          setResponse(data);
        });
    }
  };

  return (
    <div>
      <h1>{props.httpMethod} api/Test</h1>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <APIHeaders />
        <APIRequestBody />
        <APIResponseBody responseBodyResult={response} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default APIElement;
