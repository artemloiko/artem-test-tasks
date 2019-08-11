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
            alert('Your form is sent');
            actions.setSubmitting(false);
            actions.resetForm();
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
                maskingFunctionOnBlur={value => value.trim().replace(/\s+/g, ' ')}
              />

              <SimpleField
                {...formikBag}
                label="Email"
                fieldName="email"
                value={values.email}
                isTouched={touched.email}
                error={errors.email}
                inputProps={{
                  maxLength: 254
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
                maskingFunction={value => value.replace(/[^a-z0-9_]/g, '')}
              />

              <MaskedField
                {...formikBag}
                label="Phone"
                fieldName="phone"
                value={values.phone}
                isTouched={touched.phone}
                error={errors.phone}
                mask="+38 (099) 999 - 99 - 99"
                maskChar="_"
                beforeMaskedValueChange={(newState, oldState, userInput, maskOptions) => {
                  let { value } = newState;
                  const selection = newState.selection;

                  if (userInput && /^380/.test(userInput.replace(/[^\d]/g, ''))) {
                    const userInputNumbers: string = userInput.replace(/[^\d]/g, '').replace('380', '');
                    let maskedInput: string = userInputNumbers
                      .split('')
                      .reduce((masked, item) => masked.replace('9', item), maskOptions.mask);

                    maskedInput = maskedInput.replace(/9/g, maskOptions.maskChar);
                    const selectionIndex =
                      maskedInput.indexOf(maskOptions.maskChar) > 0
                        ? maskedInput.indexOf(maskOptions.maskChar)
                        : maskOptions.mask.length;
                    value = maskedInput;
                    if (selection) {
                      selection.start = selection.end = selectionIndex;
                    }
                  }

                  return {
                    value,
                    selection
                  };
                }}
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
                maskingFunction={value => value.replace(/[^+\d ,;)(]/g, '')}
                maskingFunctionOnBlur={value => value.trim().replace(/\s+/g, ' ')}
              />

              <MaskedField
                {...formikBag}
                label="Pin code"
                fieldName="pinCode"
                value={values.pinCode}
                isTouched={touched.pinCode}
                error={errors.pinCode}
                mask="‌‌​9999-9999"
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
