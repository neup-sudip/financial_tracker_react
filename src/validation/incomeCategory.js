import * as yup from "yup";

let incomeCategory = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Required !")
    .min(4, "Title too short !")
    .max(30, "Title too long !"),
  description: yup
    .string()
    .trim()
    .required("Required !")
    .min(20, "Title too short !")
    .max(1000, "Title too long !"),
});

export default incomeCategory;
