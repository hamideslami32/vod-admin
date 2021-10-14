import React, { useRef, useState } from "react";
import axios from "../../utils/plugins/axios";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  TextField,
  Box,
  Autocomplete,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  //   Switch,
  //   FormControlLabel,
} from "@mui/material";
import "./file-upload.css";

const FileUpload = () => {
  const genres = [
    "comedy",
    "adventure",
    "crime",
    "fantasy",
    "historical",
    "horror",
    "romance",
    "sci",
    "thriller",
    "western",
    "animation",
    "drama",
    "documentary",
  ];
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [file, setFile] = useState(""); // storing the uploaded file
  // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  const handleChange = (e) => {
    setProgess(0);
    getFile({ name: "", path: "" })
    const file = e.target.files[0]; // accessing file
    console.log(file);
    setFile(file); // storing file
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file); // appending file
    axios
      .post("/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
        getFile({
          name: res.data.name,
          path: "http://localhost:8800" + res.data.path,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box className="file-upload">
      <TextField
        className="title"
        type="text"
        label="Movie Title"
        variant="outlined"
      />
      <TextField
        className="image"
        type="text"
        label="Movie Image Address"
        variant="outlined"
      />
      <TextField
        className="trailer"
        type="text"
        label="Trailer Address"
        variant="outlined"
      />
      <TextField
        className="movie"
        type="text"
        label="Movie Address"
        variant="outlined"
      />
      <TextField
        className="year"
        type="text"
        label="Movie Year"
        variant="outlined"
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="0"
          label="Limit"
        >
          <MenuItem value={0}>No Limit</MenuItem>
          <MenuItem value={12}>+12</MenuItem>
          <MenuItem value={16}>+16</MenuItem>
          <MenuItem value={18}>+18</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={genres}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Genres" placeholder="Favorites" />
        )}
      />
      {/* <FormControlLabel control={<Switch />} label="Is Series ?" /> */}
      <TextField
        className="uploadFile"
        type="file"
        ref={el}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={uploadFile} className="upbutton">
        Upload
      </Button>
      <div className="video-wrapper">
        {progress > 0 && progress < 100 && (
          <LinearProgress
            className="progessBar"
            variant="determinate"
            value={progress}
            style={{ width: progress + "%" }}
          >
            {progress}
          </LinearProgress>
        )}
        {data.path && (
          <video src={data.path} alt={data.name} controls />
        )}
      </div>
      {/* displaying received video*/}
    </Box>
  );
};

export default FileUpload;
