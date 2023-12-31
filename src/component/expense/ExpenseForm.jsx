import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormikInputField from "../../common/form/FormikInput";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import FormikSelect from "../../common/form/FormikSelect";
import { createExpense, updateExpense } from "../../helpers/api/expenseApi";
import { getActiveExCategories } from "../../helpers/api/expenseCategoryApi";
import Model from "../../common/Model";
import expense from "../../validation/expanse";

const ExpenseForm = ({ editData }) => {
  const navigate = useNavigate();

  const [resMessage, setResMessage] = useState("");

  const initial = {
    categoryId: "",
    title: "",
    description: "",
    amount: "",
    date: "",
    cronFor: "",
  };

  const [form, setForm] = useState(initial);
  const [options, setOptions] = useState([]);

  const cronOptions = [
    { label: "DAILY", value: "DAILY" },
    { label: "WEEKLY", value: "WEEK" },
    { label: "MONTHLY", value: "MONTH" },
  ];

  const handleSubmit = async (values, actions) => {
    const payload = { ...values, date: new Date(values?.date)?.toISOString() };
    const { data, success, message, status } = editData
      ? await updateExpense(payload, editData?.id)
      : await createExpense(payload);

    if (success) {
      emitSuccessToast(message);
      setForm(initial);
      navigate("/expense");
    } else {
      status === 201
        ? setResMessage(message)
        : data
        ? actions.setErrors(data)
        : emitErrorToast(message);
    }
  };

  const getCatOptn = async () => {
    const { data, success, message } = await getActiveExCategories();
    if (success) {
      setOptions(
        data?.map((cat) => ({
          label: cat?.title,
          value: cat?.id,
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
        title: editData?.expenseTitle,
        date: editData.createdOn,
      }));
    }
  }, [editData]);

  return (
    <>
      <Formik
        initialValues={form}
        onSubmit={handleSubmit}
        validationSchema={expense}
        enableReinitialize
      >
        {(formik) => (
          <Form
            className="container bg-white rounded-1 shadow py-2"
            style={{ maxWidth: "800px" }}
          >
            <h5>Add Expense</h5>
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
              <FormikSelect
                label="Select Automation"
                name="cronFor"
                options={cronOptions}
                formik={formik}
              />
            </div>

            <button type="submit" className="btn btn-primary ">
              Submit
            </button>

            {resMessage && (
              <Model
                handleClose={() => setResMessage("")}
                message={resMessage}
                timer={10}
                handleConfirm="submit"
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ExpenseForm;
