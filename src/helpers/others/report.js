import {
  MONTH,
  CHART,
  PIECHART,
  INEXCHART,
  PER_MONTH_CAT,
} from "../constants/report";
import { ApiServices } from "../../http/httpServices";
import { getSingleExCategory } from "../api/expenseCategoryApi";

const perYearInEx = {};
const inExYears = [];

export const getPerYearMonthCatInEx = async () => {
  const perYearExpense = {};
  const expenseYears = [];
  const incomeYears = [];
  const perYearIncome = {};

  const perYearExPie = {};
  const exPieYears = [];
  const perYearInPie = {};
  const inPieYears = [];

  const { data: expenseData } = await ApiServices.get(
    `/v1/report/expense/per-ymc`
  );

  helperFunc(
    expenseData,
    perYearExPie,
    exPieYears,
    perYearExpense,
    expenseYears,
    2
  );

  //income
  const { data: incomeData } = await ApiServices.get(
    `/v1/report/income/per-ymc`
  );

  helperFunc(
    incomeData,
    perYearInPie,
    inPieYears,
    perYearIncome,
    incomeYears,
    1
  );

  Object.keys(perYearInEx).forEach((year) => {
    for (let i = 2; i <= 12; i++) {
      perYearInEx[year][i][1] += perYearInEx[year][i - 1][1];
      perYearInEx[year][i][2] += perYearInEx[year][i - 1][2];
    }
  });

  return {
    perYearExpense,
    expenseYears,
    perYearIncome,
    incomeYears,
    perYearInEx,
    inExYears: [...new Set(inExYears)],
    perYearExPie,
    exPieYears: [...new Set(exPieYears)],
    perYearInPie,
    inPieYears: [...new Set(inPieYears)],
  };
};

export const getPerMonthCatExpense = async (categoryId) => {
  const { data: category } = await getSingleExCategory(categoryId);

  const categoryData = {
    ...category,
  };

  category?.years?.forEach((item) => {
    const { year, amountLimit, itemLimit, id } = item;
    categoryData[year] = {
      id,
      amountLimit,
      itemLimit,
    };
  });

  const { data: report } = await ApiServices.get(
    `/v1/report/expense/per-ymc/${categoryId}`
  );

  const perYear = {};
  const years = [];

  report?.forEach((item) => {
    const { year, month, total, count } = item;
    years.push(year);
    if (!perYear[year]) {
      perYear[year] = JSON.parse(JSON.stringify(PER_MONTH_CAT));
    }
    perYear[year][MONTH[month]] = {
      total,
      count,
      gross: total,
      grossCount: count,
    };
  });

  Object.keys(perYear).forEach((year) => {
    for (let i = 2; i <= 12; i++) {
      if (perYear[year][MONTH[i]]) {
        perYear[year][MONTH[i]].gross += perYear[year][MONTH[i - 1]]
          ? perYear[year][MONTH[i - 1]]?.gross
          : 0;
        perYear[year][MONTH[i]].grossCount += perYear[year][MONTH[i - 1]]
          ? perYear[year][MONTH[i - 1]]?.grossCount
          : 0;
      }
    }
  });

  return { category: categoryData, perYear, years: [...new Set(years)] };
};

const helperFunc = (data, perYearPie, pieYears, perYear, years, inExIndex) => {
  const hasCat = {};

  let asObj = {};
  let pieObj = {};

  data.forEach((item) => {
    const { year, month, category, total } = item;
    if (!hasCat[year]) {
      hasCat[year] = [];
    }
    hasCat[year].push(category);

    if (!pieObj[year]) {
      pieObj[year] = {};
    }
    if (!pieObj[year][category]) {
      pieObj[year][category] = 0;
    }
    pieObj[year][category] += total;

    if (!asObj[year]) {
      asObj[year] = {};
    }
    if (!asObj[year][month]) {
      asObj[year][month] = {};
    }
    asObj[year][month][category] = total;
  });

  Object.keys(pieObj).forEach((year) => {
    perYearPie[year] = JSON.parse(JSON.stringify(PIECHART));
    pieYears.push(year);
    Object.keys(pieObj[year]).forEach((cat) => {
      perYearPie[year].push([cat, pieObj[year][cat]]);
    });
  });

  Object.keys(asObj).forEach((year) => {
    if (!perYear[year]) {
      perYear[year] = JSON.parse(JSON.stringify(CHART));
    }
    years.push(year);
    //fill zero in every rows
    perYear[year].forEach((month, idx) => {
      if (idx > 0) {
        month.push(
          ...Array([...new Set(hasCat[year])].length - month.length + 1).fill(0)
        );
      }
    });

    if (!perYearInEx[year]) {
      perYearInEx[year] = JSON.parse(JSON.stringify(INEXCHART));
    }
    inExYears.push(year);

    Object.keys(asObj[year]).forEach((month) => {
      Object.keys(asObj[year][month]).forEach((cat) => {
        perYearInEx[year][month][inExIndex] += asObj[year][month][cat];

        if (!perYear[year][0].includes(cat)) {
          perYear[year][0].push(cat);
        }
        const index = perYear[year][0].indexOf(cat);
        perYear[year][month][index] = asObj[year][month][cat];
      });
    });
  });
};
