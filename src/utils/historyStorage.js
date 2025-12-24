const KEY = "fruit_history";

export const getHistory = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

// ✅ FIX: TAMBAHKAN PARAMETER price DAN quantity
export const addHistory = (action, name, price = 0, quantity = 1) => {
  const history = getHistory();

  const newLog = {
    id: Date.now(),
    action,
    name,
    price: Number(price) || 0, // ✅ HARGA DARI FRUITTABLE
    quantity: Number(quantity) || 1,
    time: new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    date: new Date().toISOString().split('T')[0]
  };

  localStorage.setItem(
    KEY,
    JSON.stringify([newLog, ...history])
  );
  
  return newLog;
};

export const clearHistory = () =>
  localStorage.removeItem(KEY);