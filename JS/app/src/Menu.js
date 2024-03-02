import React, { useState } from 'react';

const Menu = () => {
  

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => toggleCheckbox(item.id)}
          />
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Menu;
