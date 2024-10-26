import React from "react";
import axios from "axios";

const Confirm = ({ totalClick, clickCount }) => {
  const handleConfirm = () => {
    axios.get("http://localhost:5000/getToken").then((res) => console.log(res));
  };

  return (
    <div className="confirm">
      <div style={{ fontSize: "25px" }}>
        <p>Total Click Count: {totalClick}</p>
        <p>You Click Count: {clickCount}</p>
      </div>
      <div style={{ alignItems: "center" }}>
        <button
          style={{
            fontSize: "16px",
            backgroundColor: "#555555",
            color: "white",
            padding: "15px 25px",
            display: "block",
            margin: "auto",
          }}
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Confirm;
