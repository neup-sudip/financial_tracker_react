/* eslint-disable react/prop-types */
const FormikSwitch = ({ label, name, formik }) => {
  return (
    <div className="form-check form-switch ">
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        name={name}
        checked={formik.values[name]}
        onChange={() => formik.setFieldValue(name, !formik.values[name])}
      />
    </div>
  );
};

export default FormikSwitch;
