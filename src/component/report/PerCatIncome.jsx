import { useCallback, useEffect, useState } from "react";
import Loading from "../../common/Loading";

const PerCatIncome = ({ id, perYearPie, years, title }) => {
  const [isPending, setIsPending] = useState(true);
  const [activeYear, setActiveYear] = useState("");

  const getData = useCallback(async () => {
    const currentYear = new Date().getFullYear();
    if (perYearPie[currentYear]) {
      setActiveYear(currentYear);
    } else {
      const firstYear = years[0];
      setActiveYear(firstYear);
    }
    setIsPending(false);
  }, [perYearPie, years]);

  const histogram = useCallback(() => {
    if (activeYear) {
      const data = window.google.visualization.arrayToDataTable(
        perYearPie[activeYear]
      );

      var options = {
        title,
        is3D: true,
      };

      var chart = new window.google.visualization.PieChart(
        document.getElementById(`piechart_3d_${id}`)
      );
      chart.draw(data, options);
    }
  }, [activeYear, id, perYearPie, title]);

  useEffect(() => {
    if (perYearPie && years) {
      getData();
    }
  }, [perYearPie, years, getData]);

  useEffect(() => {
    if (activeYear) window.google.charts.setOnLoadCallback(histogram);
  }, [activeYear, histogram]);

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
        {years?.map((year, idx) => (
          <option key={idx} value={year}>
            {`Year ${year}`}
          </option>
        ))}
      </select>
      <div id={`piechart_3d_${id}`} className="w-100"></div>
    </>
  );
};

export default PerCatIncome;
