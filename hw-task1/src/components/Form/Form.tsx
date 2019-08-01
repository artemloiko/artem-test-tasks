import React from 'react';
import { useStyles } from './useStyles';
import Button from '@material-ui/core/Button';

import { Formik, FormikProps, FormikActions } from 'formik';
import { BasicFormSchema } from './BasicFormSchema';
import { FormValues } from '../../interfaces/formValues.interface';

import SimpleField from '../SimpleField/SimpleField';
import MaskedField from '../MaskedField/MaskedField';

export default function MyForm() {
  const classes = useStyles();

  return (
    <div>
      <h1>Test form with hoooks</h1>
      <Formik
        initialValues={{
          email: '',
          name: '',
          emailRFC: '',
          employeeId: '',
          employeeIdMasked: '',
          phone: '',
          pinCode: '',
          phoneNumbers: ''
        }}
        validationSchema={BasicFormSchema}
        onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
          console.log('submit');
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 400);
        }}
      >
        {(formikBag: FormikProps<FormValues>) => {
          const { values, errors, touched, handleSubmit, isSubmitting, isValid, validateForm } = formikBag;
          const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            validateForm();
            handleSubmit(e);
          };

          return (
            <form onSubmit={handleFormSubmit} noValidate autoComplete="off" className={classes.container}>
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
                maskingFunction={value => value.replace(/\s/g, '')}
              />

              <SimpleField
                {...formikBag}
                label="Email RFC"
                fieldName="emailRFC"
                value={values.emailRFC}
                isTouched={touched.emailRFC}
                error={errors.emailRFC}
                inputProps={{
                  maxLength: 254
                }}
              />

              <SimpleField
                {...formikBag}
                label="Employee ID"
                fieldName="employeeId"
                value={values.employeeId}
                isTouched={touched.employeeId}
                error={errors.employeeId}
                inputProps={{
                  maxLength: 128
                }}
              />

              <SimpleField
                {...formikBag}
                label="Employee ID mask"
                fieldName="employeeIdMasked"
                value={values.employeeIdMasked}
                isTouched={touched.employeeIdMasked}
                error={errors.employeeIdMasked}
                inputProps={{
                  maxLength: 128
                }}
                maskingFunction={value => value.replace(/[^\w_]/g, '')}
              />

              <MaskedField
                {...formikBag}
                label="Phone number"
                fieldName="phone"
                value={values.phone}
                isTouched={touched.phone}
                error={errors.phone}
                mask="+38 (999) 999 - 99 - 99"
                maskChar="_"
              />

              <SimpleField
                {...formikBag}
                label="Phone numbers"
                fieldName="phoneNumbers"
                value={values.phoneNumbers}
                isTouched={touched.phoneNumbers}
                error={errors.phoneNumbers}
                inputProps={{
                  maxLength: 256
                }}
                maskingFunction={value => value.replace(/[^+\d ,;]/g, '')}
              />

              <MaskedField
                {...formikBag}
                label="Pin code"
                fieldName="pinCode"
                value={values.pinCode}
                isTouched={touched.pinCode}
                error={errors.pinCode}
                mask="9999-9999"
                maskChar="_"
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
