import React, { useState, useRef } from "react";
import "./APIElement.css";
import APIHeaders from "./APIHeaders";
import APIRequestBody from "./APIRequestBody";
import APIResponse from "./APIResponse";
import AxiosClient from "./AxiosClient";
import { useFormik } from "formik";

const APIElement = (props) => {
  const formRef = useRef();
  const [response, setResponse] = useState();

  const formik = useFormik({
    initialValues: {
      header: "",
      requestBody: "",
    },
    onSubmit: (values) => {
      const headers = values.header;
      const requestBody = values.requestBody
        ? JSON.parse(values.requestBody)
        : {};

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
        default:
          console.error("Invalid HTTP Method");
          break;
      }
    },
  });

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
    AxiosClient.post("", request)
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
    AxiosClient.delete("", { data: request })
      .then((response) => {
        console.log("responseBody: ", response.data);
        setResponse(response.data);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

  return (
    <div>
      <h1>{props.httpMethod} api/Test</h1>
      <form onSubmit={formik.handleSubmit}>
        <APIHeaders
          onChange={formik.handleChange}
          value={formik.values.header}
          name="header"
        />
        <APIRequestBody
          onChange={formik.handleChange}
          value={formik.values.requestBody}
          name="requestBody"
        />
        <APIResponse responseBodyResult={response} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default APIElement;
