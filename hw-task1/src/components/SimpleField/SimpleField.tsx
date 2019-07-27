import React from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { FormikProps } from "formik";
import { FormValues } from "@i/formValues.interface";
import { useStyles } from "./useStyles";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

interface SimpleFieldProps {
  label: string;
  fieldName: string;
  value: string;
  isTouched?: boolean;
  error?: string;
  inputProps: OutlinedInputProps["inputProps"];
}

const SimpleField: React.SFC<
  SimpleFieldProps & FormikProps<FormValues>
> = props => {
  const classes = useStyles();
  const {
    handleBlur,
    handleChange,
    error,
    isTouched,
    value,
    inputProps,
    label,
    fieldName
  } = props;

  return (
    <FormControl
      className={classes.formControl}
      variant="outlined"
      error={!!error && isTouched}
    >
      <TextField
        label={label}
        name={fieldName}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        margin="normal"
        variant="outlined"
        className={classes.textField}
        aria-describedby={`component-${fieldName}-error-text`}
        error={!!error && isTouched}
        inputProps={inputProps}
      />
      <FormHelperText
        id={`component-${fieldName}-error-text`}
        classes={{ root: classes.formHelper }}
      >
        {error && isTouched && error}
      </FormHelperText>
    </FormControl>
  );
};

export default SimpleField;
