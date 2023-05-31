import React, { useContext } from "react";
import "../../css/Dashboard/UserAccount.css";
import { FaUserAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import userContext from "../../context/UserContext";

function UserAccount() {
  const { user } = useContext(userContext);

  return (
    <div className="main__container">
      <div className="main__header">
        <p className="dheader__title">DASHBOARD &gt; Account</p>
      </div>
      <div className="main__account">
        <div className="user__photo">
          <div className="user__icon">
            <FaUserAlt className="uicon" />
          </div>
          <div className="user__profilename">{user.username}</div>
          <div className="user__designation">
            {user.designation ? user.designation : "Product manager"}
          </div>
          <div className="edit__profile">
            <AiFillEdit />
            <span style={{ marginLeft: "6px" }}>Edit</span>
          </div>
        </div>
        <div className="user__info">
          <h1>Account Details</h1>
          <div className="user__name userOpt">
            <label htmlFor="username">Full name : </label>
            <input
              type="text"
              value={user.username}
              id="username"
              name="username"
              className="account-input"
              disabled
            />
          </div>

          <div className="user__email userOpt">
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              value={user.email}
              id="email"
              name="email"
              className="account-input"
              disabled
            />
          </div>

          <div className="user__phone userOpt">
            <label htmlFor="phone">Phone : </label>
            <input
              type="number"
              value={user.phone ? user.phone : 123456789}
              id="phone"
              name="phone"
              className="account-input"
              disabled
            />
          </div>

          <div className="user__addr userOpt">
            <label htmlFor="address">Billing Address : </label>
            <input
              type="text"
              value={
                user.address ? user.address : "Civil lines, Roorkee, UK, India"
              }
              id="address"
              name="address"
              className="account-input"
              disabled
            />
          </div>

          <div className="user__zcode userOpt">
            <label htmlFor="zipcode">Zip code : </label>
            <input
              type="number"
              value={user.zipcode ? user.zipcode : 12345}
              id="zipcode"
              name="zipcode"
              className="account-input"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
