import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItem] = useState([]);

  function handleAddItem(item) {
    setItem((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItem((items) => items.filter((item) => id !== item.id));
  }

  function handleTogleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (isConfirmed) setItem([]);
  }

  return (
    <div>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDelete}
        onUpdateItem={handleTogleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
