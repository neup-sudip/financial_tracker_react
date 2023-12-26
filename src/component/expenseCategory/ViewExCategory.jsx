import { useEffect, useState } from "react";
import { getPerMonthCatExpense } from "../../api/helpers/report";
import { useParams } from "react-router-dom";
import { MONTH_ARRAY } from "../../constants/report";
import ExpenseYear from "./ExpenseYear";

const ViewExCategory = () => {
  const { id } = useParams();
  const [perMonth, setPerMonth] = useState("");
  const [report, setReport] = useState("");
  const [yearsOpt, setYearsOpt] = useState([]);
  const [activeYear, setActiveYear] = useState("");
  const [category, setCategory] = useState("");

  const getData = async () => {
    const { category: data, perYear, years } = await getPerMonthCatExpense(id);

    setCategory(data);
    setReport(perYear);
    setYearsOpt(years);

    const currentYear = new Date().getFullYear();

    if (perYear[currentYear]) {
      setActiveYear(currentYear);
    } else {
      const firstYear = years[0];
      setActiveYear(firstYear);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (activeYear) {
      setPerMonth(report[activeYear]);
    }
  }, [activeYear]);

  const percentCalc = (month) => {
    return (
      (perMonth[month]?.global / category[activeYear]?.amountLimit) * 100 || 0
    );
  };

  return (
    <div className="p-3 rounded-1">
      <select
        className="form-control"
        onChange={(e) => setActiveYear(e.target.value)}
      >
        {yearsOpt?.map((year, idx) => (
          <option key={idx} value={year}>
            {`${category?.title} expense on ${year}`}
          </option>
        ))}
      </select>

      <ExpenseYear
        yearData={category[activeYear]}
        setCategory={setCategory}
        activeYear={activeYear}
        categoryId={id}
      />

      <div className="row gy-2 mt-2 ">
        {MONTH_ARRAY.map((month, idx) => (
          <div key={idx} className="col-md-6 col-lg-3 d-flex">
            <div className="p-2 w-100 shadow bg-light-subtle  rounded-1">
              <div className="d-flex align-items-center justify-content-between ">
                <p>
                  {month}
                  <span className="mx-1 text-info">
                    {percentCalc(month).toFixed(2)}%
                  </span>
                </p>
                <p>
                  <span className="text-info mx-1 ">
                    {perMonth[month]?.count || "0"}
                  </span>
                  {perMonth[month]?.globalCount || "0"}/
                  {category[activeYear]?.itemLimit || 0}
                </p>
              </div>
              <span>
                <span className="text-info mx-1 ">
                  {perMonth[month]?.total || "0.0"}
                </span>
                {perMonth[month]?.global || "0.0"}/
                {category[activeYear]?.amountLimit || 0}
              </span>
            </div>
            <div
              className="w-100 bg-danger"
              style={{ maxWidth: "10px", height: "100%" }}
            >
              <div
                className="w-100 bg-success"
                style={{
                  height: `${
                    100 - (percentCalc(month) >= 100 ? 100 : percentCalc(month))
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewExCategory;
