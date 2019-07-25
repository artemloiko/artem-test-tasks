import React, { useState } from "react";
import { useStyles } from "./useStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, FormikProps, FormikActions, FormikErrors } from "formik";

interface FormValues {
  name: string;
  email: string;
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
        initialValues={{ email: "", name: "" }}
        validate={(values: FormValues) => {
          let errors: FormikErrors<FormValues> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
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
          isSubmitting
        }: FormikProps<FormValues>) => (
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className={classes.container}
          >
            <TextField
              label="First name"
              name="name"
              value={values.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            {errors.name && touched.name && errors.name}
            <TextField
              label="Email"
              name="email"
              margin="normal"
              variant="outlined"
              className={classes.textField}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={isSubmitting}
            >
              Primary
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
