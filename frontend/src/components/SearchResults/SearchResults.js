import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchResults.css';

const SearchResults = (props) => {

  const [articles, setArticles] = useState([]); 

  return (
    <div className="SearchResults">
      <div className="main-title">Search Results</div>
      <div className="results-cards">

        { articles.length > 0 ?
          (articles.map(article => 
            <div className="card" key={article.id}>
              <div className="card-title">{article.title}</div>
              <div className="card-text">{article.body}</div>
            </div>
          ))
        :
        (<div className="no-results">No results to show... Create Articles & Articles</div>)
        }
      </div>
    </div>
  );
}
 
export default SearchResults;
 