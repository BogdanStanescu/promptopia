"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      if (response.ok) {
        setPrompts(data);
      }
    };

    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="w-full relative flex-center">
        <input
          className="search_input peer"
          required
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: any[];
  handleTagClick: () => void;
}) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default Feed;
