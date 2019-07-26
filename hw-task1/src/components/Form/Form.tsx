import React, { useState } from "react";
import { useStyles } from "./useStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import { Formik, FormikProps, FormikActions, FormikErrors } from "formik";
import { BasicFormSchema } from "./BasicFormSchema";

interface FormValues {
  name: string;
  email: string;
  emailRFC: string;
}

export function MyForm() {
  const classes = useStyles();
  // const fields: string[] = [
  //   "firstName",
  //   "email",
  //   "emailRFC",
  //   "employeeId",
  //   "phone",
  //   "phones",
  //   "PINcode"
  // ];
  return (
    <div>
      <h1>Test form with hoooks</h1>
      <Formik
        initialValues={{ email: "", name: "", emailRFC: "" }}
        validationSchema={BasicFormSchema}
        onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
          console.log("submit");
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid
        }: FormikProps<FormValues>) => (
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className={classes.container}
          >
            <FormControl
              className={classes.formControl}
              variant="outlined"
              error={!!errors.name && touched.name}
            >
              <TextField
                label="First name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                variant="outlined"
                className={classes.textField}
                aria-describedby="component-name-error-text"
                error={!!errors.name && touched.name}
                inputProps={{
                  maxLength: 128
                }}
              />
              <FormHelperText id="component-name-error-text">
                {errors.name && touched.name && errors.name}
              </FormHelperText>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              error={!!errors.name && touched.name}
            >
              <TextField
                label="Email"
                name="email"
                margin="normal"
                variant="outlined"
                className={classes.textField}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-email-error-text"
                error={!!errors.email && touched.email}
                inputProps={{
                  maxLength: 128
                }}
              />
              <FormHelperText id="component-email-error-text">
                {errors.email && touched.email && errors.email}
              </FormHelperText>
            </FormControl>

            <FormControl
              className={classes.formControl}
              variant="outlined"
              error={!!errors.name && touched.name}
            >
              <TextField
                label="Email RFC"
                name="emailRFC"
                margin="normal"
                variant="outlined"
                className={classes.textField}
                value={values.emailRFC}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-emailRFC-error-text"
                error={!!errors.emailRFC && touched.emailRFC}
                inputProps={{
                  maxLength: 128
                }}
              />
              <FormHelperText id="component-emailRFC-error-text">
                {errors.emailRFC && touched.emailRFC && errors.emailRFC}
              </FormHelperText>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              className={`${classes.button} primaryButton`}
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              Primary
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
