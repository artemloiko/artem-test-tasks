import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  })
);

export function Form() {
  const classes = useStyles();
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
      <form noValidate autoComplete="off" className={classes.container}>
        {fields.map(field => (
          <div className="row">
            <TextField
              label={field}
              className={classes.textField}
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
