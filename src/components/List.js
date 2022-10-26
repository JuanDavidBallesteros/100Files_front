import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";


// function generate(element,arreglo) {

//   return arreglo.map((value) =>

//     React.cloneElement(element, {
//       key: value,
//     })

//   );
// }

export default function InteractiveList(props) {
  const arreglo = props.arreglo
  console.log(props, "props")
  return (
    <Box sx={{ width:"100%" }}>
      <List dense={false}>

        {
          arreglo.map((elemento) => (
            <ListItem
            secondaryAction={
             
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ul>
              <li >
                {elemento._id}
              </li>
              <li>
                {elemento.name}.{elemento.ext}
              </li>
              <li>
                {elemento.path}
              </li>
            </ul>
            
          </ListItem>
          ))
        }

      </List>
    </Box>
  );
}
