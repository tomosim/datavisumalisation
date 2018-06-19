import React from "react";

const Menu = ({ setAxisState, data }) => {
  const dataSets = ["mass", "reclong", "reclat"];

  return (
    <span>
      <select onChange={e => setAxisState(e.target.value)}>
        {dataSets.map(title => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Menu;
