import * as Yup from "yup";

const EmployeeFormValidationSchema = Yup.object().shape({
  Name: Yup.string().required("Please enter your name"),
  Password: Yup.string().required("Please set a password"),
  Email: Yup.string().email().required("Pls enter your email"),
  Contact: Yup.number()
    .min(10)
    .max(10)
    .required("Please enter your contact number"),
  Date: Yup.date().required("Please select a date"),
  Country: Yup.string().required("Please select an option from dropdown"),
  Gender: Yup.string().required("Please choose an option"),
  Description: Yup.string().required("Please write something"),
  checkbox2: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Acceptance is required"),
});

export default EmployeeFormValidationSchema;
