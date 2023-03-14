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
