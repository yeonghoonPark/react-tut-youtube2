import React, { useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Header() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSubmit = //
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      navigate(`/videos/${text}`);
      setText("");
    };

  const handleChange = //
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setText(e.target.value);
    };

  useEffect(() => {
    setText(keyword || "");
  }, [keyword]);

  return (
    <header>
      <Link to='/'>
        <BsYoutube />
        <h1>Youtube</h1>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          className='bg-black text-white'
          type='text'
          placeholder='Search...'
          value={text}
          onChange={handleChange}
        />
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
