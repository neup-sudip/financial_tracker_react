/* eslint-disable react/prop-types */
import { Field } from "formik";

const FormikSelect = ({ label, name, options, formik }) => {
  return (
    <>
      <div className="form-group row bg-dark-subtle p-2 rounded-1 my-2">
        <label className="col-sm-2 col-form-label" htmlFor={label}>
          {label}
        </label>
        <div className="col-sm-10">
          <Field
            as="select"
            name={name}
            className={`form-control ${
              formik?.touched?.[name] && formik?.errors?.[name]
                ? "border-danger"
                : null
            }`}
          >
            <option disabled value="">
              Please select one
            </option>
            {options?.map((option, idx) => (
              <option key={idx} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </Field>
        </div>
      </div>
      {formik?.touched?.[name] && formik?.errors?.[name] && (
        <div className="text-danger">{formik?.errors?.[name]}</div>
      )}
    </>
  );
};

export default FormikSelect;
