import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { Box, Paper, Container, Button, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Singleview_vehicle from "../../Components/Singleview_vehicle_registration";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [vehicledata, setvehicledata] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/`)
      .then((res) => {
        if (res.data) {
          setvehicledata(res.data.data);
        }
      })
      .catch((er) => {});
  }, []);
  let navigate = useNavigate();
  return (
    <>
      <Header />
      <Box component={Paper} elevation={0} square minHeight={"82vh"} py={3}>
        <Container maxWidth="md">
          <Grid
            component={Paper}
            elevation={2}
            container
            justifyContent={"center"}
            alignItems="center"
            sx={{ border: "3px solid #1976D2", p: 2, borderRadius: 2 }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("/addregistration");
              }}
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#333",
                  color: "#1976D2",
                },
              }}
            >
              ADD Registration
            </Button>
          </Grid>
          <Divider />
          <br />
          <Grid
            component={Paper}
            elevation={2}
            container
            justifyContent={"center"}
            alignItems="center"
            sx={{ border: "3px solid #1976D2", p: 2, borderRadius: 2 }}
          >
            {vehicledata.map((row, index) => {
              return (
                <Singleview_vehicle key={row._id} data={row} index={index} />
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default Dashboard;
