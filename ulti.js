export const NumberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const DateStrFromDateTime = (dateTime) => {
  return dateTime.toISOString().slice(0,10);
}