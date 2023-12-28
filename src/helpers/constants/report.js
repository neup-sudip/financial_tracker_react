export const MONTH = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const MONTH_ARRAY = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getPerMonthCat = () => {
  let catObj = {};
  MONTH_ARRAY.forEach(
    (month) =>
      (catObj[month] = {
        total: 0,
        count: 0,
        gross: 0,
        grossCount: 0,
      })
  );
  return catObj;
};

export const PER_MONTH_CAT = getPerMonthCat();

export const INEXCHART = [
  ["Month", "Income", "Expense"],
  ["Jan", 0, 0],
  ["Feb", 0, 0],
  ["Mar", 0, 0],
  ["Apr", 0, 0],
  ["May", 0, 0],
  ["Jun", 0, 0],
  ["July", 0, 0],
  ["Aug", 0, 0],
  ["Sep", 0, 0],
  ["Oct", 0, 0],
  ["Nov", 0, 0],
  ["Dec", 0, 0],
];

export const CHART = [
  ["Month"],
  ["Jan"],
  ["Feb"],
  ["Mar"],
  ["Apr"],
  ["May"],
  ["Jun"],
  ["July"],
  ["Aug"],
  ["Sep"],
  ["Oct"],
  ["Nov"],
  ["Dec"],
];

export const PIECHART = [["Category", "Amount"]];
