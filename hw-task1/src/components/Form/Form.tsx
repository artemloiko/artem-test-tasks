import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export function Form() {
  const [value, setValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const fields: string[] = [
    "firstName",
    "email",
    "emailRFC",
    "employeeId",
    "phone",
    "phones",
    "PINcode"
  ];
  return (
    <div>
      <h1>Test form</h1>
      <form noValidate autoComplete="off">
        {fields.map(field => (
          <div className="row">
            <TextField
              label={field}
              value={value}
              onChange={handleInputChange}
              name={field}
              margin="normal"
              variant="outlined"
            />
          </div>
        ))}
      </form>
    </div>
  );
}
