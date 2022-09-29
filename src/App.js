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
    fileReader.onload = (e) => {
      setUpload(e.target.result);
      console.log(e.target.result);
    };

    fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>", {
      method: "POST",
      body: upload,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
              100 Files
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
