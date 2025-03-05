import React, { useEffect, useState } from "react"
import "./SearchForm.css"
import { Link, useNavigate } from "react-router-dom";
import { getSuggistionAPI } from "../../Services/productServices";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault(); 
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([])
  };

  const handleKeyDown = e => {
    if(selectedItem < suggestions.length)
    {
      if(e.key === "ArrowDown"){
        setSelectedItem((current) => 
          current === suggestions.length-1 ? 0 : current+1)
      }
      else if(e.key === "ArrowUp"){
        setSelectedItem((current) => 
          current === 0 ? suggestions.length-1 : current-1)
      }

      else if(e.key === "Enter" && selectedItem>-1){
        const suggestion = suggestions[selectedItem]
        console.log(suggestion)
        navigate(`/products?search=${suggestion.title}`)
        setSearch("")
        setSuggestions([])
      }
    }else {
      setSelectedItem(-1);
    }
  };

  useEffect(()=>{
      const delaySuggestions = setTimeout(()=>{
        if(search.trim()!==""){
          getSuggistionAPI(search).
          then(res=>setSuggestions(res.data)).
          catch(err=>console.log(err))
        } else {
          setSuggestions([])
        }
      }, 300)
      return () => clearTimeout(delaySuggestions);
    },[search])

  return (
    <form className="navbar_form align_center" onSubmit={handleSubmit}>
      <input
        type="text"
        className="navbar_search"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button 
        type="submit"
        className="general_button"
      >
        Search
      </button>
      {suggestions.length > 0 &&
        <ul className="search_result">
        {suggestions.map((suggestion, index) =>
          <li 
            className={selectedItem === index ? "search_suggestion_link active": "search_suggestion_link"}
            key={suggestion._id}
          >
            <Link 
              to={`/products?search=${suggestion.title}`}
              onClick={()=> {
                setSearch("")
                setSuggestions([])
              }}
            >
            {suggestion.title}
            </Link>
          </li>
        )}
      </ul>}
    </form>
  );
};

export default SearchForm;
