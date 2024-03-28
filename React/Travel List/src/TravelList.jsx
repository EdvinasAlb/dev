import { useState } from "react";
import Logo from "./TravelList/Logo";
import Form from "./TravelList/Form";
import PackingList from "./TravelList/Packing-list";
import Stats from "./TravelList/Stats";

export default function App() {
  const [items, setItems] = useState([]);

  //Add items
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  //Delete items
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  //Update items
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  //Clear list
  function handleClearList() {
    const confirmed = window.confirm("Are you sure want to delete all items");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
