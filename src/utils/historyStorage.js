const KEY = "fruit_history";

export const getHistory = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export const addHistory = (action, name) => {
  const history = getHistory();

  const newLog = {
    id: Date.now(),
    action, // Add | Edit | Delete
    name,
    time: new Date().toLocaleString("id-ID"),
  };

  localStorage.setItem(
    KEY,
    JSON.stringify([newLog, ...history])
  );
};

export const clearHistory = () =>
  localStorage.removeItem(KEY);
