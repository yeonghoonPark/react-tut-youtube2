import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
    setText("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <header>
      <h1>
        <Link to='/'>Youtube</Link>
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          className='bg-black text-white'
          type='text'
          value={text}
          placeholder='Search...'
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
