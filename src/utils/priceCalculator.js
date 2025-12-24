// Fungsi untuk menghitung total dari array items
export const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);
};

// Fungsi untuk mengelompokkan item per bulan
export const groupByMonth = (history) => {
  const months = {};
  
  history.forEach(item => {
    const date = new Date(item.date || Date.now());
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!months[monthYear]) {
      months[monthYear] = {
        total: 0,
        items: [],
        month: date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
      };
    }
    
    months[monthYear].total += item.price || 0;
    months[monthYear].items.push(item);
  });
  
  return months;
};

// Fungsi untuk mendapatkan total bulan ini
export const getCurrentMonthTotal = (history) => {
  const currentMonth = new Date().toLocaleDateString('id-ID', { 
    month: 'long', 
    year: 'numeric' 
  });
  
  const monthlyTotal = groupByMonth(history)[currentMonth];
  
  return monthlyTotal?.total || 0;
};