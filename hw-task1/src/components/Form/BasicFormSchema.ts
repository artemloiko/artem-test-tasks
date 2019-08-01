import * as Yup from 'yup';

export const BasicFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .matches(/^[A-Za-z ]{2,}$/, 'Only lattin letters support')
    .required('Required')
    .trim(),
  email: Yup.string()
    .trim()
    .matches(/^[^\s]+@[^\s]+\.[^\s]{2,}$/, 'Invalid email address')
    .required('Required'),
  emailRFC: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email address'
    )
    .required('Required')
    .test(
      'emailLocalPart',
      'Email local part (before @) can contains maximum 64 characters.',
      value => /@/.test(value) && value.split('@')[0].length <= 64
    ),
  employeeId: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .matches(/^[\w]{2,}$/, 'Only lattin letters, numbers and underscore are supported')
    .required('Required')
    .trim(),
  employeeIdMasked: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .required('Required'),
  phone: Yup.string()
    .required('Required')
    .test('pinCodeMaskTest', 'Required.', value => value && value.replace(/[^\d]/g, '').length === 12),
  pinCode: Yup.string()
    .required('Required')
    .test('pinCodeMaskTest', 'Required.', value => value && value.replace(/[^\d]/g, '').length === 8),
  phoneNumbers: Yup.string()
    .matches(/\d{8,}/, 'Must be at least one number with 8 numbers')
    .required('Required')
    .trim()
  // password: Yup.string()
  //   .min(8, "Must be longer than 8 characters")
  //   .required("Required")
});
