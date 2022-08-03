import {
  Box,
  Paper,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

// react- toast message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import useEffect and useState
import { useEffect, useState } from "react";

function ADDvehicle_Registration() {
  // usestate
  const [vehicle_number, setvehicle_number] = useState();

  //
  const navigate = useNavigate();
  let { _id } = useParams();

  //useEffect call on getsingle data
  useEffect(() => {
    if (_id) {
      axios
        .get(`http://localhost:5000/api/${_id}`)
        .then((res) => {
          if (res.data) {
            setvehicle_number(res.data.data.vehicle_number);
          }
        })
        .catch((er) => {});
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      vehicle_number: vehicle_number.trim(),
      _id: _id ? _id : "",
    };
    // post method
    if (_id) {
      axios
        .put(`http://localhost:5000/api/`, data)
        .then((res) => {
          console.log(res.data.type, res.data.updated);
          console.log("hiiii");
          if (res.data.updated == "notupdate") {
            toast.error("please make the changes", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            if (
              res.data.type == "modern" ||
              res.data.type == "old" ||
              res.data.type == "vintage"
            ) {
              toast.success(
                "license plates number is valid and type is " + res.data.type,

                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                }
              );
              if (res.data.updated == true) {
                setTimeout(() => {
                  navigate("/");
                }, 3050);
                toast.success("Successfully updated", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            } else if (
              res.data.type == "notvaild" &&
              res.data.updated == false
            ) {
              console.log("sayanthan");
              toast.error("license plates that shouldn’t be valid", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          }
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      // put method
      axios
        .post(`http://localhost:5000/api/`, data)
        .then((res) => {
          if (
            res.data.type == "modern" ||
            res.data.type == "old" ||
            res.data.type == "vintage"
          ) {
            toast.success(
              "license plates number is valid and  type is " + res.data.type,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              }
            );
            if (res.data.inserted === true) {
              setTimeout(() => {
                navigate("/");
              }, 3050);
              toast.success("successfully Updated", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else if (res.data.inserted === false) {
              toast.error("unable to  Updated", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          } else if (
            res.data.type == "notvaild" &&
            res.data.inserted == false
          ) {
            console.log("wrong type");
            toast.error("license plates that shouldn’t be valid", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((er) => {
          console.log(er);
          console.log("error");
        });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header />
      <Box component={Paper} elevation={0} square minHeight={"75vh"} py={3}>
        <Container maxWidth="md">
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#1976D2",
              fontFamily: "open sans",
              fontSize: { xs: 18, sm: 25 },
            }}
          >
            {_id ? "Update Registration" : "New Registation"}
          </Typography>

          <Grid
            component={Paper}
            elevation={2}
            container
            justifyContent={"center"}
            alignItems="center"
            sx={{ border: "2px solid #1976D2", p: 2, borderRadius: 2 }}
          >
            <Grid item xs={12} md={7}>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ p: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete="given-id"
                      name="id"
                      required
                      fullWidth
                      value={vehicle_number}
                      onChange={(event) => {
                        setvehicle_number(event.target.value);
                      }}
                      id="id"
                      placeholder="vehicle license plate number "
                      autoFocus
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    "&:hover": { bgcolor: "#333", color: "#fff" },
                  }}
                >
                  {_id ? "Update Registration" : "Add Registration"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default ADDvehicle_Registration;
