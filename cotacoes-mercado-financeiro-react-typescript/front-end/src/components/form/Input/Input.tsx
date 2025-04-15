import React from "react";
import { TextField } from "@mui/material";
import { InputDefault } from "./Input.types";

const Input: React.FC<InputDefault> = ({ description, handleOnChange }) => {
  return (
    <TextField
      id="outlined-basic"
      label={description}
      variant="outlined"
      onChange={handleOnChange}
    />
  );
};

export default Input;
