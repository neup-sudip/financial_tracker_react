import { useEffect } from "react";

const PerCatIncome = ({ id }) => {
  const histogram = () => {
    const data = window.google.visualization.arrayToDataTable([
      ["Task", "Hours per Day"],
      ["Work", 11],
      ["Eat", 2],
      ["Commute", 2],
      ["Watch TV", 2],
      ["Sleep", 7],
    ]);

    var options = {
      title: "Per Category Income",
      is3D: true,
    };

    var chart = new window.google.visualization.PieChart(
      document.getElementById(`piechart_3d_${id}`)
    );
    chart.draw(data, options);
  };

  useEffect(() => {
    window.google.charts.setOnLoadCallback(histogram);
  }, []);

  return <div id={`piechart_3d_${id}`} className="w-100"></div>;
};

export default PerCatIncome;
