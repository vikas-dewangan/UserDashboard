const STORAGE_KEY = 'userData';

const getData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const fetchItems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getData());
    }, 500);
  });
};

export const addItem = (item) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getData();
      const newItem = { id: Date.now(), ...item };
      data.push(newItem);
      setData(data);
      resolve(newItem);
    }, 500);
  });
};

export const updateItem = (id, updatedItem) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = getData();
      const index = data.findIndex((item) => item.id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem };
        setData(data);
        resolve(data[index]);
      } else {
        reject(new Error('Item not found'));
      }
    }, 500);
  });
};

export const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = getData();
      const newData = data.filter((item) => item.id !== id);
      if (data.length === newData.length) {
        reject(new Error('Item not found'));
      } else {
        setData(newData);
        resolve(id);
      }
    }, 500);
  });
};
