import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [friends, setfriends] = useState(initialFriends);
  const [SelectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setshowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setfriends((friends) => [...friends, friend]);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setshowAddFriend(false);
  }

  function handleSplitBill(value) {
    setfriends((friends) =>
      friends.map((friend) =>
        friend.id === SelectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          SelectedFriend={SelectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {SelectedFriend && (
        <FormSplitBill
          SelectedFriend={SelectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, SelectedFriend, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          SelectedFriend={SelectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, SelectedFriend, onSelection }) {
  const isSelected = SelectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👥 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📷 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ SelectedFriend, onSplitBill }) {
  const [bill, setbill] = useState("");
  const [paidByUser, setpaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setwhoIsPaying] = useState("user");

  function handleSubmit() {
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {SelectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(+e.target.value)}
      />

      <label>🫰 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setpaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />

      <label>🧑‍🤝‍🧑{SelectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is payintg the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setwhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{SelectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
