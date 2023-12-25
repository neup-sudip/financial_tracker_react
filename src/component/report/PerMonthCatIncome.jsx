import { useEffect, useState } from "react";
import Loading from "../../common/Loading";

const PerMonthCatIncome = ({ perYearIncome, incomeYears }) => {
  const divId = "per-month-cat-income";
  const [isPending, setIsPending] = useState(true);
  const [activeYear, setActiveYear] = useState("");

  const getData = async () => {
    const currentYear = new Date().getFullYear();
    if (perYearIncome[currentYear]) {
      setActiveYear(currentYear);
    } else {
      const firstYear = incomeYears[0];
      setActiveYear(firstYear);
    }
    setIsPending(false);
  };

  const histogram = () => {
    const data = window.google.visualization.arrayToDataTable(
      perYearIncome[activeYear]
    );

    var options = {
      title: "Income per month per category",
      vAxis: {
        title: "Income amount",
      },
      hAxis: {
        title: "Per month categories",
      },
    };

    const chart = new window.google.visualization.ColumnChart(
      document.getElementById(divId)
    );

    chart.draw(data, options);
  };

  useEffect(() => {
    if (perYearIncome) getData();
  }, [perYearIncome]);

  useEffect(() => {
    if (activeYear) window.google.charts.setOnLoadCallback(histogram);
    // eslint-disable-next-line
  }, [activeYear]);

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
        {incomeYears?.map((year, idx) => (
          <option key={idx} value={year}>
            {`Year ${year}`}
          </option>
        ))}
      </select>
      <div id={divId} className="w-100"></div>
    </>
  );
};

export default PerMonthCatIncome;
