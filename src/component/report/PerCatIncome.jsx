import { useEffect, useState } from "react";
import Loading from "../../common/Loading";

const PerCatIncome = ({ id, perYearPie, years, title }) => {
  const [perYearData, setPerYearData] = useState("");
  const [isPending, setIsPending] = useState(true);

  const getData = async () => {
    const currentYear = new Date().getFullYear();

    if (perYearPie[currentYear]) {
      setPerYearData(perYearPie[currentYear]);
    } else {
      const firstYear = years[0];
      setPerYearData(perYearPie[firstYear]);
    }
    setIsPending(false);
  };

  const histogram = () => {
    const data = window.google.visualization.arrayToDataTable(perYearData);

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
    if (perYearData) window.google.charts.setOnLoadCallback(histogram);
    // eslint-disable-next-line
  }, [perYearData]);

  if (isPending) {
    return <Loading />;
  }

  return <div id={`piechart_3d_${id}`} className="w-100"></div>;
};

export default PerCatIncome;
