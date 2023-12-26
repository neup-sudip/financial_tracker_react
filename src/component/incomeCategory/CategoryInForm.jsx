import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import FormikInputField from "../../common/form/FormikInput";
import {
  createInCategory,
  updateInCategory,
} from "../../helpers/api/incomeCategoryApis";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import { useNavigate } from "react-router-dom";

const CategoryInForm = ({ editData }) => {
  const navigate = useNavigate();
  const initial = {
    title: "",
    description: "",
  };
  const [form, setForm] = useState(initial);

  const handleSubmit = async (values) => {
    const { success, message } = editData
      ? await updateInCategory(values, editData?.id)
      : await createInCategory(values);
    if (success) {
      emitSuccessToast(message);
      setForm(initial);
      navigate("/income-category");
    } else {
      emitErrorToast(message);
    }
  };

  useEffect(() => {
    if (editData) {
      setForm((prev) => ({ ...prev, ...editData }));
    }
  }, [editData]);

  return (
    <Formik
      initialValues={form}
      onSubmit={handleSubmit}
      // validationSchema={bookValidation}
      enableReinitialize
    >
      {(formik) => (
        <Form className="container bg-white rounded-1 shadow py-2">
          <h5>Add Income Category</h5>
          <div className="px-2">
            <FormikInputField
              name="title"
              formik={formik}
              label="Title"
              placeholder="Enter title"
            />
            <FormikInputField
              name="description"
              formik={formik}
              label="Description"
              placeholder="Enter description"
            />
          </div>

          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryInForm;
