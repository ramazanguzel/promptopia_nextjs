"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          ></PromptCard>
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    return posts.filter((item) => {
      const lowerCaseSearchText = searchText.toLowerCase();
      const prompt = item.prompt ? item.prompt.toLowerCase() : "";
      const tag = item.tag ? item.tag.toLowerCase() : "";
      const username = item.creator.username
        ? item.creator.username.toLowerCase()
        : "";

      return (
        prompt.includes(lowerCaseSearchText) ||
        tag.includes(lowerCaseSearchText) ||
        username.includes(lowerCaseSearchText)
      );
    });
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (e) => {
    const tagText = e.replace(/#/g, "");
    setSearchText(tagText);

    const searchResult = filterPrompts(tagText);
    setSearchedResults(searchResult);
  };

  // get ready for deployment
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
