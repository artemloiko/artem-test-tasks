import React, { Component } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

interface FormProps {}

interface FormState {
  [key: string]: string;
}
// firstName: string;
// email: string;
// emailRFC: string;
// employeeId: string;
// phone: string;
// phones: string;
// PINcode: string;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 200
    }
  })
);

export class MainForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      emailRFC: "",
      employeeId: "",
      phone: "",
      phones: "",
      PINcode: ""
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
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
                value={this.state.field}
                onChange={this.handleChange}
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
}
