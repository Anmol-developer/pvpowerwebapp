import React, { useContext } from "react";
import "../../css/Dashboard/UserAccount.css";
import { FaUserAlt } from "react-icons/fa";
import {AiFillEdit} from 'react-icons/ai'
import userContext from "../../context/UserContext";

function UserAccount() {
  const {user} = useContext(userContext)

  return (
    <div className="main__container">
      <div className="main__header">
        <p className="dheader__title">DASHBOARD &gt; Account</p>
      </div>
      <div className="main__account">
        <div className="user__photo">
          <div className="user__icon">
            <FaUserAlt className="uicon"/>
          </div>
          <div className="user__profilename">{user.username}</div>
          <div className="user__designation">{user.designation ? (user.designation):('Product manager')}</div>
          <div className="edit__profile">
            <AiFillEdit/><span style={{marginLeft:'6px'}}>Edit</span>
          </div>
        </div>
        <div className="user__info">
          <h1>Account Details</h1>
          <p className="fullname"><span className="info-opt">Full name : </span>{user.username}</p>
          <p className="Email"><span className="info-opt">Email : </span>{user.email}</p>
          <p className="Phone"><span className="info-opt">Phone : </span>{user.phone ? (user.phone) : (123456789)}</p>
          <p className="bill__address"><span className="info-opt">Billing Address : </span>{user.address?(user.address):('Civil lines, Roorkee, UK, India')}</p>
          <p className="zip__code"><span className="info-opt">Zip code : </span>{user.zipcode?(user.zipcode):(12345)}</p>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
