const KEY = "fruits";

export const getFruits = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const saveFruits = (data) =>
  localStorage.setItem(KEY, JSON.stringify(data));
