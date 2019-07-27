import * as Yup from "yup";

export const BasicFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be longer than 2 characters")
    .max(128, "Nice try, nobody has a first name that long")
    .required(
      "Required, Local part of email can contains 64 characters max. The local part is part before @"
    ),
  email: Yup.string()
    .matches(/.{1,64}@.+\..{2,}/, "Invalid email address")
    .required("Required"),
  emailRFC: Yup.string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    )
    .required("Required")
    .test(
      "emailLocalPart",
      "Local part of email can contains 64 characters max. The local part is part before @",
      value => value === "jane@gmail.com"
    )
  // password: Yup.string()
  //   .min(8, "Must be longer than 8 characters")
  //   .required("Required")
});
