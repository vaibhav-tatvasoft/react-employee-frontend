import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import AxiosClient from "./AxiosClient";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const EmployeeFormValidationSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  Password: Yup.string().required("Password is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Contact: Yup.string().required("Contact number is required"),
  Date: Yup.date().required("Date of birth is required"),
  Country: Yup.string().required("Country is required"),
  Gender: Yup.string().oneOf(["male", "female"]).required("Gender is required"),
  isSubscribed: Yup.boolean(),
  Description: Yup.string().required("Description is required"),
  checkbox2: Yup.boolean().oneOf([true], "Accept terms is required"),
});

const EmployeeForm = () => {
  const navigate = useNavigate();

  const genderOptions = {
    0: "male",
    1: "female",
  };
  const location = useLocation();
  const initialValues = location.state || {};
  console.log(genderOptions[initialValues.gender]);

  const formikData = useFormik({
    initialValues: {
      Name: initialValues.name || "",
      Password: initialValues.password || "",
      Email: initialValues.email || "",
      Contact: initialValues.contact || "",
      Date: initialValues.date ? location.state.date.substring(0, 10) : "",
      Country: initialValues.country || "",
      Gender: genderOptions[initialValues.gender] || "",
      isSubscribed: initialValues.isSubscribed || false,
      Description: initialValues.description || "",
      checkbox2: initialValues.checkbox2 || false,
    },
    validationSchema: EmployeeFormValidationSchema,
    onSubmit: async (values) => {
      if (initialValues.isEditForm) {
        var response = await AxiosClient.patch(
          "http://localhost:5110/api/employee/" + initialValues.id,
          values
        );
        if (response != null) {
          console.log("Updated the values");
        }
        navigate("/");
      } else {
        var response = await AxiosClient.post(
          "http://localhost:5110/api/employee",
          values
        );
        if (response != null) {
          console.log("Saved the values");
        }
      }
    },
  });

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", maxWidth: "600px", margin: "auto" }}
    >
      <Typography variant="h4" gutterBottom>
        Employee Signup form
      </Typography>
      <form onSubmit={formikData.handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="Name"
            {...formikData.getFieldProps("Name")}
            error={formikData.touched.Name && Boolean(formikData.errors.Name)}
            helperText={formikData.touched.Name && formikData.errors.Name}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="Password"
            {...formikData.getFieldProps("Password")}
            error={formikData.touched.Password && Boolean(formikData.errors.Password)}
            helperText={formikData.touched.Password && formikData.errors.Password}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            name="Email"
            {...formikData.getFieldProps("Email")}
            error={formikData.touched.Email && Boolean(formikData.errors.Email)}
            helperText={formikData.touched.Email && formikData.errors.Email}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Contact Number"
            type="text"
            variant="outlined"
            fullWidth
            name="Contact"
            {...formikData.getFieldProps("Contact")}
            error={formikData.touched.Contact && Boolean(formikData.errors.Contact)}
            helperText={formikData.touched.Contact && formikData.errors.Contact}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Date Of Birth"
            type="date"
            variant="outlined"
            fullWidth
            name="Date"
            InputLabelProps={{ shrink: true }}
            {...formikData.getFieldProps("Date")}
            error={formikData.touched.Date && Boolean(formikData.errors.Date)}
            helperText={formikData.touched.Date && formikData.errors.Date}
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth error={formikData.touched.Country && Boolean(formikData.errors.Country)}>
            <InputLabel>Select</InputLabel>
            <Select
              name="Country"
              label="Country"
              {...formikData.getFieldProps("Country")}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="india">India</MenuItem>
              <MenuItem value="usa">USA</MenuItem>
            </Select>
            <FormHelperText>{formikData.touched.Country && formikData.errors.Country}</FormHelperText>
          </FormControl>
        </Box>
        <Box mb={2}>
          <FormControl component="fieldset" error={formikData.touched.Gender && Boolean(formikData.errors.Gender)}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup name="Gender" {...formikData.getFieldProps("Gender")}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
            <FormHelperText>{formikData.touched.Gender && formikData.errors.Gender}</FormHelperText>
          </FormControl>
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                name="isSubscribed"
                {...formikData.getFieldProps("isSubscribed")}
              />
            }
            label="Get latest updates"
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Explain yourself in few words"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            name="Description"
            {...formikData.getFieldProps("Description")}
            error={formikData.touched.Description && Boolean(formikData.errors.Description)}
            helperText={formikData.touched.Description && formikData.errors.Description}
          />
        </Box>
        <Box mb={2}>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" name="file" />
          </Button>
        </Box>
        <Box mb={2}>
          <fieldset>
            <legend>Fieldset</legend>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkbox2"
                    {...formikData.getFieldProps("checkbox2")}
                  />
                }
                label="Accept terms"
              />
              <FormHelperText>{formikData.touched.checkbox2 && formikData.errors.checkbox2}</FormHelperText>
            </FormGroup>
          </fieldset>
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default EmployeeForm;
