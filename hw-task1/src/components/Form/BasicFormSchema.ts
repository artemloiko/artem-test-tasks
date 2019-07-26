import * as Yup from "yup";

export const BasicFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Must be longer than 2 characters")
    .max(128, "Nice try, nobody has a first name that long")
    .required("Required"),
  email: Yup.string()
    .matches(/.{1,64}@.+\..{2,}/, "Invalid email address")
    .required("Required"),
  emailRFC: Yup.string()
    .matches(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      "Invalid email address"
    )
    .required("Required")
  // password: Yup.string()
  //   .min(8, "Must be longer than 8 characters")
  //   .required("Required")
});
