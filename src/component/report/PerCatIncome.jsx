import { useEffect, useState } from "react";
import Loading from "../../common/Loading";

const PerCatIncome = ({ id, perYearPie, years, title }) => {
  const [isPending, setIsPending] = useState(true);
  const [activeYear, setActiveYear] = useState("");

  const getData = async () => {
    const currentYear = new Date().getFullYear();
    if (perYearPie[currentYear]) {
      setActiveYear(currentYear);
    } else {
      const firstYear = years[0];
      setActiveYear(firstYear);
    }
    setIsPending(false);
  };

  const histogram = () => {
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
  };

  useEffect(() => {
    if (perYearPie) getData();
  }, [perYearPie]);

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
