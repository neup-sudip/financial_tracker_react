import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import FormikInputField from "../../common/form/FormikInput";
import { useNavigate } from "react-router-dom";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import {
  createExCategory,
  updateExCategory,
} from "../../api/helpers/expenseCategoryApi";

const CategoryExForm = ({ editData }) => {
  const navigate = useNavigate();
  const initial = {
    title: "",
    description: "",
    amountLimit: "",
    itemLimit: "",
  };
  const [form, setForm] = useState(initial);

  const handleSubmit = async (values) => {
    const { success, message } = editData
      ? await updateExCategory(values, editData?.categoryId)
      : await createExCategory(values);
    if (success) {
      emitSuccessToast(message);
      setForm(initial);
      navigate("/expense-category");
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
            <FormikInputField
              name="amountLimit"
              formik={formik}
              label="Amount Limit"
              type="number"
              placeholder="Enter amount limit"
            />
            <FormikInputField
              name="itemLimit"
              formik={formik}
              label="Item Limit"
              type="number"
              placeholder="Enter item limit"
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
