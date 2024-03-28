import { v4 as uuidv4 } from "uuid";

function get(key) {
  const data = localStorage.getItem(key);
  return null !== data ? JSON.parse(data) : [];
}

function set(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function lsStore(key, data) {
  const id = uuidv4();
  const newData = { ...data, id };
  const oldData = get(key);
  const dataToStore = [...oldData, newData];
  set(key, dataToStore);
  return id;
}

export function lsUpdate(key, id, data) {
  const oldData = get(key);
  const dataToStore = oldData.map((item) =>
    item.id === id ? { ...item, ...data, id } : item
  );
  set(key, dataToStore);
}

export function lsDestroy(key, id) {
  const oldData = get(key);
  const dataToStore = oldData.filter((item) => item.id !== id);
  set(key, dataToStore);
}

export function lsRead(key) {
  return get(key);
}

export function lsShow(key, id) {
  const oldData = get(key);
  const dataToShow = oldData.find((item) => item.id === id);
  return dataToShow;
}
