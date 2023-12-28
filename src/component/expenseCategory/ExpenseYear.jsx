import { useEffect, useMemo, useState } from "react";
import { addYears, editYears } from "../../helpers/api/yearsApi";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";

const ExpenseYear = ({ yearData, activeYear, categoryId, setCategory }) => {
  const initial = useMemo(() => {
    return {
      amountLimit: "",
      itemLimit: "",
    };
  }, []);

  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    let payload = { ...form, year: activeYear };
    const { data, success, message } = yearData
      ? await editYears(payload, categoryId, yearData?.id)
      : await addYears(payload, categoryId);

    if (success) {
      emitSuccessToast(message);
      setCategory((prev) => ({ ...prev, [data?.year]: data }));
    } else {
      emitErrorToast(message);
    }
  };

  useEffect(() => {
    if (yearData) {
      setForm((prev) => ({ ...prev, ...yearData }));
    } else {
      setForm(initial);
    }
  }, [yearData, initial]);

  return (
    <div className="d-flex align-items-end  justify-content-between ">
      <div className="">
        <label>Year</label>
        <input
          disabled
          className="form-control"
          type="number"
          name="amountLimit"
          placeholder="Amount Limit"
          value={activeYear}
        />
      </div>
      <div className="">
        <label>Amount Limit</label>
        <input
          className="form-control"
          type="number"
          name="amountLimit"
          placeholder="Amount Limit"
          value={form?.amountLimit}
          onChange={handleChange}
        />
      </div>
      <div className="">
        <label>Item Limit</label>
        <input
          className="form-control"
          type="number"
          name="itemLimit"
          placeholder="Item Limit"
          value={form?.itemLimit}
          onChange={handleChange}
        />
      </div>
      <div className="">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ExpenseYear;
