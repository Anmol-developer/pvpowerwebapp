import React from "react";
import ReactDom from "react-dom";
import "../../css/Modal/EditUser.css";

function EditUser({ open, closeModal, saveInfo, user }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="edit__wrapper" onClick={closeModal}></div>
      <div className="edit__container">
        <div className="edit__info">
          <h1>Edit Account</h1>
          <div className="edit__name  editOpt">
            <label htmlFor="username">Full name : </label>
            <input
              type="text"
              value={user.username}
              id="username"
              name="username"
              className="account-input"
            />
          </div>

          <div className=" edit__email  editOpt">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              value={user.email}
              id="email"
              name="email"
              className="account-input"
              required
            />
          </div>

          <div className=" edit__phone  editOpt">
            <label htmlFor="phone">Phone : </label>
            <input
              type="tel"
              value={user.phone ? user.phone : 123456789}
              id="phone"
              name="phone"
              className="account-input"
              required
            />
          </div>

          <div className=" edit__addr  editOpt">
            <label htmlFor="address">Billing Address : </label>
            <input
              type="text"
              value={
                user.address ? user.address : "Civil lines, Roorkee, UK, India"
              }
              id="address"
              name="address"
              className="account-input"
              required
            />
          </div>

          <div className=" edit__zcode  editOpt">
            <label htmlFor="zipcode">Zip code : </label>
            <input
              type="number"
              value={user.zipcode ? user.zipcode : 12345}
              id="zipcode"
              name="zipcode"
              className="account-input"
              required
            />
          </div>

          <div className="edit__btns">
            <button className="save_new_info" onClick={saveInfo}>
              Save
            </button>
            <button className="cancel_new_info" onClick={closeModal}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </>,
    document.getElementById("edit_user")
  );
}

export default EditUser;
