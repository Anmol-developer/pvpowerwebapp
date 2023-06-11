import React from "react";
import "../../css/Pages/Footer.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { GrLinkedin } from "react-icons/gr";
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className="footer__container">
      <div className="footer__top">
        <div className="footer__logo">Logo</div>
        <div className="footer__company">
          <p className="title">Company</p>
          <Link to={'/about'} className="about">About</Link>
          <Link to={'/faq'} className="history" style={{marginBottom:'15px'}}>FAQ's</Link>
          <span className="contact__email">Email: abcd@gmil.com</span><br/>
          <span className="contact__phone">Phone: 123456789</span>
        </div>
        <div className="footer__follow">
          <p className="title follow">Follow Us</p>
          <div className="social__icon">
            <BsFacebook className="facebook icon" />
            <AiFillInstagram className="instagram icon" />
            <GrLinkedin className="linkedin icon" />
          </div>
        </div>
      </div>
      <p className="footer__copyright">copyright @2023</p>
    </div>
  );
}

export default Footer;
