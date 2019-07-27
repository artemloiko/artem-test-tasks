import React from "react";
import { useStyles } from "./useStyles";
import Button from "@material-ui/core/Button";

import { Formik, FormikProps, FormikActions } from "formik";
import { BasicFormSchema } from "./BasicFormSchema";
import { FormValues } from "@i/formValues.interface";

import SimpleField from "../SimpleField/SimpleField";

export default function MyForm() {
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
        {(formikBag: FormikProps<FormValues>) => {
          const {
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            isValid
          } = formikBag;
          return (
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              className={classes.container}
            >
              <SimpleField
                {...formikBag}
                label="Name"
                fieldName="name"
                value={values.name}
                isTouched={touched.name}
                error={errors.name}
                inputProps={{
                  maxLength: 128
                }}
              />

              <SimpleField
                {...formikBag}
                label="Email"
                fieldName="email"
                value={values.email}
                isTouched={touched.email}
                error={errors.email}
                inputProps={{
                  maxLength: 128
                }}
              />

              <SimpleField
                {...formikBag}
                label="Email RFC"
                fieldName="emailRFC"
                value={values.emailRFC}
                isTouched={touched.emailRFC}
                error={errors.emailRFC}
                inputProps={{
                  maxLength: 320
                }}
              />

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
          );
        }}
      </Formik>
    </div>
  );
}
