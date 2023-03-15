import moment from "moment";

export const formatCash = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const [mFmt, dFmt, tFmt, dtFmt] = [
  "YYYY-MM",
  "YYYY-MM-DD",
  "HH:mm:00",
  "YYYY-MM-DD HH:mm:00",
];

export const getDates = () => {
  let mon = moment().format(mFmt);
  let dates = {};
  dates.start = moment(`${mon}-01 00:00:00`, dtFmt).format(dtFmt);
  dates.end = moment(`${mon}-01 00:00:00`, dtFmt).add(1, "month").format(dtFmt);
  return dates;
};

export const getPrevMonth = () => {
  let now = moment().format(dFmt);
  let dates = {};
  dates.start = moment().subtract(29, "days").format(dFmt);
  dates.end = moment().add(1, "day").format(dFmt);
  console.log("mon dates ==>", dates);
  return dates;
};

export const dayObj = () => {
  console.log("day called -->");
  let obj = [];
  for (let i = 29; i >= 0; i--) {
    let dd = moment().subtract(i, "day").format(dFmt);
    obj.push({ id: i + 1, date: dd });
  }
  console.log("len", obj.length);
  return obj;
};
