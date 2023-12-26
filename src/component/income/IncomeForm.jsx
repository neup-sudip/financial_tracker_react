import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import FormikInputField from "../../common/form/FormikInput";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import { useNavigate } from "react-router-dom";
import { createIncome, updateIncome } from "../../helpers/api/incomeApi";
import FormikSelect from "../../common/form/FormikSelect";
import { getActiveInCategories } from "../../helpers/api/incomeCategoryApis";

const IncomeForm = ({ editData }) => {
  const navigate = useNavigate();

  const initial = {
    categoryId: "",
    title: "",
    description: "",
    amount: "",
    date: "",
  };

  const [form, setForm] = useState(initial);
  const [options, setOptions] = useState([]);

  const handleSubmit = async (values) => {
    const payload = { ...values, date: new Date(values?.date).toISOString() };
    const { success, message } = editData
      ? await updateIncome(payload, editData?.id)
      : await createIncome(payload);
    if (success) {
      emitSuccessToast(message);
      setForm(initial);
      navigate("/income");
    } else {
      emitErrorToast(message);
    }
  };

  const getCatOptn = async () => {
    const { data, success, message } = await getActiveInCategories();
    if (success) {
      setOptions(
        data?.map((cat) => ({
          label: cat?.title,
          value: cat?.categoryId,
        }))
      );
    } else {
      emitErrorToast(message);
    }
  };

  useEffect(() => {
    getCatOptn();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm((prev) => ({
        ...prev,
        ...editData,
        title: editData?.incomeTitle,
        date: editData?.createdOn,
      }));
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
          <h5>Add Income</h5>
          <div className="px-2">
            <FormikSelect
              label="Select Category"
              name="categoryId"
              options={options}
              formik={formik}
            />
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
              name="amount"
              formik={formik}
              type="number"
              label="Amount"
              placeholder="Enter amount"
            />
            <FormikInputField
              name="date"
              formik={formik}
              type="datetime-local"
              label="Date"
              placeholder="Select date"
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

export default IncomeForm;
