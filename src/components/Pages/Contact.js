import React, { useState } from "react";
import "../../css/Pages/Contact.css";
import axios from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [query, setQuery] = useState("");
  const [words, setWords] = useState(0);
  const [overlimit, setOverlimit] = useState(false);

  const handleQuery = (e) => {
    const inputText = e.target.value;

    // Remove leading/trailing white spaces and split the input into words
    const words = inputText.trim().split(/\s+/);

    // Limit the words count to 500
    const limitedWords = words.slice(0, 500);

    // Join the limited words back into a string
    const limitedText = limitedWords.join(" ");
    if (limitedText.length < 500) {
      setQuery(e.target.value);
    } else {
      setOverlimit(true);
    }
    setWords(limitedText.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!overlimit) {
      const send__query = await axios.post("/query", { name, email, query, subject });
      if (send__query.status === 200) {
        toast.success("Your Query is sent. We will get back to you soon.", {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        });
      } else {
        toast.error("An error occured. Please try again later.", {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="contact__container">
      <div className="contact__text">
        <h1>Have Questions?</h1>
        <p>
          Please feel free to call or email us, or use our contact form to get
          in touch with us. We look forward to hearing from you!
        </p>
        <h3>Emergency? Call Us:</h3>
        <p>+935783023</p>
        <h3>Send Us Mail</h3>
        <p>abc@gmail.com</p>
      </div>
      <div className="contact__form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <textarea
            id="textarea"
            name="textarea"
            placeholder="Enter your query"
            value={query}
            onChange={handleQuery}
            required
          />
          <span className="max-wl">{words}/500</span>

          <button
            type="submit"
            className={`contact-sbmt-btn ${overlimit && "disable"}`}
          >
            Send Message
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Contact;
