import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAllEmployees } from "./APIElement";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  let getAllEmployeesResponse = null;
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees();
        getAllEmployeesResponse = response;
        console.log(
          "getEmployeesresult  ------- " + getAllEmployeesResponse.data[0].id
        );
        console.log("get all employees response data " + response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);
  const handleAdd = () => {
    navigate("/employee-form");
  };

  async function handleEdit(item) {
    //console.log("edit button clicked!!! ---- index = " + index + 1);
    console.log("id of item ----" + item.id);
    var response = await axios.get(
      "http://localhost:5110/api/employee/" + item.id
    );
    console.log(response.data);
    const additionalData = {
      ...response.data,
      isEditForm: true,
    };
    navigate("/employee-form", { state: additionalData });
  }

  async function handleDelete(item) {
    console.log("delete button clicked!!! ---- index = " + item.id);
    await axios.delete("http://localhost:5110/api/employee/" + item.id);
    setItems((prevItems) =>
      prevItems.filter((employee) => employee.id !== item.id)
    );
    console.log("Employee deleted successfully");
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{ marginRight: 1 }}
        >
          Add
        </Button>
      </Box>

      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography>{item.id}</Typography>
              <Typography variant="h6">
                {item.name}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={async () => await handleEdit(item)}
                  sx={{ marginRight: 2, marginLeft: 5 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Button>
              </Typography>
              <Typography>{item.description}</Typography>
              <Typography>{item.email}</Typography>
              <Typography>{item.number}</Typography>
              <Typography>{item.gender}</Typography>
              <Typography>{item.date}</Typography>
              <Typography>{item.country}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
