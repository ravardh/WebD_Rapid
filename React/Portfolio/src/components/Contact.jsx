import React, { useState } from "react";

const Contact = () => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;

    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Comment:", comment);

    setComment({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <div className="container bg-warning text-black d-grid gap-2 p-3">
        <form className="d-grid gap-2" onSubmit={handleSubmit}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={comment.name}
            onChange={handelChange}
            className="form-control"
          />
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={comment.email}
            onChange={handelChange}
            className="form-control"
          />
          <label>Message: </label>
          <textarea
            name="message"
            value={comment.message}
            onChange={handelChange}
            className="form-control"
          ></textarea>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
