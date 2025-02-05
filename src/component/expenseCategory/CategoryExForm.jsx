import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import FormikInputField from "../../common/form/FormikInput";
import { useNavigate } from "react-router-dom";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import {
  createExCategory,
  updateExCategory,
} from "../../helpers/api/expenseCategoryApi";
import expenseCategory from "../../validation/expanseCAtegory";

const CategoryExForm = ({ editData }) => {
  const navigate = useNavigate();
  const initial = {
    title: "",
    description: "",
  };
  const [form, setForm] = useState(initial);

  const handleSubmit = async (values, action) => {
    const { data, success, message } = editData
      ? await updateExCategory(values, editData?.id)
      : await createExCategory(values);
    if (success) {
      emitSuccessToast(message);
      setForm(initial);
      
      navigate("/expense-category");
    } else {
      data ? action.setErrors(data) : emitErrorToast(message);
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
      validationSchema={expenseCategory}
      enableReinitialize
    >
      {(formik) => (
        <Form
          className="container bg-white rounded-1 shadow py-2"
          style={{ maxWidth: "800px" }}
        >
          <h5>Add Expense Category</h5>
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

export default CategoryExForm;
