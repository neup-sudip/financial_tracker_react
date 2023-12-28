import { useCallback, useEffect, useState } from "react";
import Loading from "../../common/Loading";

const PerMonthInVsEx = ({ perYearInEx, inExYears }) => {
  const divId = "per-month-in-vs-ex";
  const [isPending, setIsPending] = useState(true);
  const [activeYear, setActiveYear] = useState("");

  const getData = useCallback(async () => {
    const currentYear = new Date().getFullYear();
    if (perYearInEx[currentYear]) {
      setActiveYear(currentYear);
    } else {
      const firstYear = inExYears[0];
      setActiveYear(firstYear);
    }
    setIsPending(false);
  }, [inExYears, perYearInEx]);

  const histogram = useCallback(() => {
    if (activeYear) {
      const data = window.google.visualization.arrayToDataTable(
        perYearInEx[activeYear]
      );

      var options = {
        title: "Income Vs Expense (Gross)",
        vAxis: {
          title: "Amount",
        },
        hAxis: {
          title: "Per Month",
        },
      };

      const chart = new window.google.visualization.LineChart(
        document.getElementById(divId)
      );

      chart.draw(data, options);
    }
  }, [activeYear, perYearInEx]);

  useEffect(() => {
    if (perYearInEx && inExYears) {
      getData();
    }
  }, [getData, perYearInEx, inExYears]);

  useEffect(() => {
    window.google.charts.setOnLoadCallback(histogram);
  }, [histogram]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <select
        className="form-control bg-primary-subtle"
        onChange={(e) => setActiveYear(e.target.value)}
        value={activeYear}
      >
        {inExYears?.map((year, idx) => (
          <option key={idx} value={year}>
            {`Year ${year}`}
          </option>
        ))}
      </select>
      <div id={divId} className="w-100"></div>
    </>
  );
};

export default PerMonthInVsEx;
