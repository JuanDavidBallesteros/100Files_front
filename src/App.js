import "./App.css";
import React, { useState } from "react";
import { Box, Grid, Button, Typography, Stack } from "@mui/material";
import InteractiveList from "./components/List";
import UploadButton from "./components/Upload";

function App() {
  
  const [list, setList] = useState([]);
  const [upload, setUpload] = useState({});
  const [host, setHost] = useState("");
  const [storage, setStorage] = useState("");

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
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(upload),
    }
    
    await fetch("http://back:5000/upload-file", config)
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        getHost();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // useEffect(()=>{
  //   getFiles()
  // },[list]);

  const getStorage = async () => {
    const files = await fetch ("http://back:5000/get-storage",{
      method:"GET",
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
    });

    if (!files.ok) {
      throw new Error(`Error! status: ${files.status}`);
    } else {
      const backResponse = await files.json(); 
      setStorage(backResponse);
    }
  };

  const getHost = async () => {
    const files = await fetch ("http://back:5000/get-host",{
      method:"GET",
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
    });

    if (!files.ok) {
      throw new Error(`Error! status: ${files.status}`);
    } else {
      const backResponse = await files.json(); 
      setHost(backResponse);
    }
  };
  
  const getFiles = async () => {
   
    const files = await fetch ("http://back:5000/get-files",{
      method:"GET",
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
    });

    if (!files.ok) {
      throw new Error(`Error! status: ${files.status}`);
    } else {
      const backResponse = await files.json(); 
      setList(backResponse);
      getStorage();
      getHost();
    }
  };

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
              <Button variant="contained" disableElevation onClick={() => {getFiles() }}>
                Refresh
              </Button>
              <UploadButton onUpload={uploadItem} />
              <Button variant="contained" disableElevation onClick={() => { sendFile() }}>
                Send
              </Button>
            </Stack>
            <Stack>
              <Typography variant="h6" > Storage: {storage.size} {storage.measure} </Typography>
              <Typography variant="h6" > Host: {host.name} </Typography>
              <Typography variant="h6" > IP Host: {host.ip} </Typography>
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
            <Typography variant={"h3"} sx={{ fontWheigth: "bold" }}>
              Your Files
            </Typography>
            <Box overflow={"auto"} sx={{ width: "100%", height: "80%" }}>
              { list.length !== 0  && <InteractiveList arreglo={list} /> }
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
