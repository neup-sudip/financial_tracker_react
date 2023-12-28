import * as yup from "yup";

let expense = yup.object().shape({
  categoryId: yup.number().required("Required !").min(0),
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
  amount: yup.number().required("Required !").min(0),
  date: yup.date().required("Required !"),
});

export default expense;
