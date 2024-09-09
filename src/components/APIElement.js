// src/APIDocumentation.js
import React, { useState, useRef } from "react";
import "./APIElement.css"; // Import the CSS file
import APIHeaders from "./APIHeaders";
import APIRequestBody from "./APIRequestBody";
import APIResponse from "./APIResponse";
import AxiosClient from "./AxiosClient";
import { Axios } from "axios";

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
      AxiosClient.get()
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
      }) 
      .catch((error) => {
        console.error("Error occurred:", error);
      });
    }
    function postAllEmployees(headers, request) {
      console.log("request body: ", request);
      AxiosClient.post('', request)
        .then((response) => {
          console.log("responseBody: ", response.data);
          setResponse(response.data);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }
    
    function updateEmployeeById(id, request) {
      let url = `/${id}`;
      AxiosClient.patch(url, request)
        .then((response) => {
          console.log("responseBody: ", response.data);
          setResponse(response.data);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }
    
    function deleteEmployeeById(request) {
      AxiosClient.delete('', { data: request })
        .then((response) => {
          console.log("responseBody: ", response.data);
          setResponse(response.data);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }
  };

  return (
    <div>
      <h1>{props.httpMethod} api/Test</h1>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <APIHeaders />
        <APIRequestBody />
        <APIResponse responseBodyResult={response} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default APIElement;
