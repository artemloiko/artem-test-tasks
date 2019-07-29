import React from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { FormikProps } from "formik";
import { FormValues } from "../../interfaces/formValues.interface";
import { useStyles } from "./useStyles";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

interface SimpleFieldProps {
  label: string;
  fieldName: string;
  value: string;
  isTouched?: boolean;
  error?: string;
  inputProps: OutlinedInputProps["inputProps"];
  maskingFunction?: (value: string) => string;
}

const SimpleField: React.SFC<
  SimpleFieldProps & FormikProps<FormValues>
> = props => {
  const classes = useStyles();
  const {
    error,
    isTouched,
    value,
    inputProps,
    label,
    fieldName,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    maskingFunction
  } = props;

  const handleCroppedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldTouched(fieldName, false);
    if (maskingFunction) {
      e.target.value = maskingFunction(e.target.value);
    }
    handleChange(e);
  };

  const handleTrimmedBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(fieldName, e.target.value.trim());
    handleBlur(e);
  };

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
        onChange={handleCroppedChange}
        onBlur={handleTrimmedBlur}
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
