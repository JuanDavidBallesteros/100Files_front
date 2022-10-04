import * as React from 'react';
import Button from '@mui/material/Button';

export default function UploadButtons({onUpload}) {
  return (
      <Button variant="contained" component="label" color="secondary" disableElevation>
        Upload
        <input hidden accept="" multiple type="file" onChange={onUpload} />
      </Button>
  );
}