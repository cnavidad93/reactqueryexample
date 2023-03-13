import React, { useState } from 'react';
import { ListItem } from '../helpers/utils';

const HomeSidebar = ({
  onCreate,
}: {
  onCreate: (item: ListItem) => void;
}) => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const onSaveHandler = () => {
    onCreate?.({id: Math.floor(Math.random() * 100), name, amount });
  };

  return (
    <section className="home-sidebar">
      <h2>Add item</h2>
      <div className="form-section">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" defaultValue={name} onChange={(ev) => setName(ev.target.value)} />
      </div>
      <div className="form-section">
        <label htmlFor="amount">Amount: </label>
        <input type="number" name="amount" defaultValue={amount} onChange={(ev) => setAmount(Number(ev.target.value))} />
      </div>
      <button onClick={onSaveHandler}> Save </button>
    </section>
  );
};

export default HomeSidebar;
