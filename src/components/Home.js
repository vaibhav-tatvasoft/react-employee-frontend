import { Box, Button, Grid, Paper, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "./APIElement";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees();
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

  const handleEdit = async (item) => {
    try {
      const response = await axios.get(`http://localhost:5110/api/employee/${item.id}`);
      const additionalData = {
        ...response.data,
        isEditForm: true,
      };
      navigate("/employee-form", { state: additionalData });
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`http://localhost:5110/api/employee/${item.id}`);
      setItems((prevItems) => prevItems.filter((employee) => employee.id !== item.id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginRight: 2 }}
        />
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
        {currentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography>{item.id}</Typography>
              <Typography variant="h6">
                {item.name}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEdit(item)}
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

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
