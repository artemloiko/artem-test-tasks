import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { FormikProps } from 'formik';
import { FormValues } from '../../interfaces/formValues.interface';
import { useStyles } from '../SimpleField/useStyles';
import InputMask, { InputState, MaskOptions } from 'react-input-mask';

interface MaskedFieldProps {
  label: string;
  fieldName: string;
  value: string;
  mask: string;
  maskChar?: string;
  isTouched?: boolean;
  error?: string;
  beforeMaskedValueChange?: (
    newState: InputState,
    oldState: InputState,
    userInput: string,
    maskOptions: MaskOptions
  ) => InputState;
  // beforeMaskedValueChange:
}

const MaskedField: React.SFC<MaskedFieldProps & FormikProps<FormValues>> = props => {
  const classes = useStyles();
  const {
    error,
    isTouched,
    value,
    label,
    fieldName,
    handleBlur,
    handleChange,
    mask,
    maskChar = ' ',
    setFieldTouched,
    beforeMaskedValueChange
  } = props;

  const handleCroppedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldTouched(fieldName, false);
    handleChange(e);
  };
  return (
    <FormControl className={classes.formControl} variant="outlined" error={!!error && isTouched}>
      <InputMask
        mask={mask}
        maskChar={maskChar}
        value={value}
        onChange={handleCroppedChange}
        onBlur={handleBlur}
        beforeMaskedValueChange={beforeMaskedValueChange}
      >
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <TextField
            label={label}
            name={fieldName}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            aria-describedby={`component-${fieldName}-error-text`}
            error={!!error && isTouched}
            inputProps={inputProps}
          />
        )}
      </InputMask>

      <FormHelperText id={`component-${fieldName}-error-text`} classes={{ root: classes.formHelper }}>
        {error && isTouched && error}
      </FormHelperText>
    </FormControl>
  );
};

export default MaskedField;
