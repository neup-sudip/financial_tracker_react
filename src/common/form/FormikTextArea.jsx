/* eslint-disable react/prop-types */
import { Field } from "formik";

const FormikTextArea = ({ type = "text", name, label, formik, ...props }) => {
  return (
    <>
      <div className="form-group row bg-dark-subtle p-2 rounded-1 my-2 w-100 m-auto">
        <label className="col-sm-2 col-form-label px-1" htmlFor={label}>
          {label}
        </label>
        <div className="col-sm-10 p-0">
          <Field
            {...props}
            as="textarea"
            autoComplete="off"
            type={type}
            name={name}
            className={`form-control ${
              formik?.touched?.[name] && formik?.errors?.[name]
                ? "border-danger"
                : ""
            }`}
          />
        </div>
      </div>
      {formik?.touched?.[name] && formik?.errors?.[name] && (
        <div className="text-danger">{formik?.errors?.[name]}</div>
      )}
    </>
  );
};

export default FormikTextArea;
