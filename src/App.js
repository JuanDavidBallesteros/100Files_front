import "./App.css";
import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, Stack } from "@mui/material";
import InteractiveList from "./components/List";
import UploadButton from "./components/Upload";

function App() {
  const [list, setList] = useState([]);
  const [upload, setUpload] = useState({});

  const onRefresh = () => {
    fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>")
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setList([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uploadItem = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    console.log(event.target.files[0].name)
    fileReader.onload = (e) => {
      //Separar la data(nombre y tipo de archivo) con los datos de base 64
      const info = e.target.result.split(";");
      const datos = {
        //Nomre del archivo
        "name": event.target.files[0].name,
        //Dats en base 64
        "data": info[1].substring(7),
      };
      setUpload(datos);
      console.log(datos)
    };

  };

  const sendFile = async () => {
    let config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(upload),
    }
    
    await fetch("http://127.0.0.1:5000/upload-file", config)
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }



  useEffect(() => {}, [list]);

  return (
    <Box sx={{ height: "100vh", width: "100%", overflow: "hidden" }}>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              px: 2,
              gap: 3,
            }}
          >
            <Typography variant={"h1"} sx={{ fontWheigth: "bold" }}>
              100 Files Integrated
            </Typography>
            <Typography variant={"h6"}>
              The alternative to save your files in an insecure way
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                mx: 2,
                gap: 3,
              }}
            >
              {/* <SearchFiel /> */}
              <Button variant="contained" disableElevation onClick={onRefresh}>
                Refresh
              </Button>
              <UploadButton onUpload={uploadItem} />
              <Button variant="contained" disableElevation onClick={() => { sendFile() }}>
                Send
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          md={8}
          sx={
            {
              /* bgcolor: "#cba"  */
            }
          }
        >
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant={"h3"} fontWheigth={"bold"}>
              Your Files
            </Typography>
            <Box overflow={"auto"} sx={{ width: "100%", height: "80%" }}>
              <InteractiveList />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
