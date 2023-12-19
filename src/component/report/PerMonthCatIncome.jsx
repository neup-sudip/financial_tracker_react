import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../common/Loading";

const PerMonthCatIncome = ({ perYearIncome, incomeYears }) => {
  const divId = `per-month-cat-${uuidv4()}`;
  const [perYearData, setPerYearData] = useState("");
  const [isPending, setIsPending] = useState(true);

  const getData = async () => {
    const currentYear = new Date().getFullYear();

    if (perYearIncome[currentYear]) {
      setPerYearData(perYearIncome[currentYear]);
    } else {
      const firstYear = incomeYears[0];
      setPerYearData(perYearIncome[firstYear]);
    }
    setIsPending(false);
  };

  const histogram = () => {
    const data = window.google.visualization.arrayToDataTable(perYearData);

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
    getData();
  }, [perYearIncome]);

  useEffect(() => {
    if (perYearData) window.google.charts.setOnLoadCallback(histogram);
    // eslint-disable-next-line
  }, [perYearData]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div>
      <div id={divId} className="w-100"></div>
    </div>
  );
};

export default PerMonthCatIncome;
