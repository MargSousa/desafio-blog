import React, { useState } from 'react';
import './SearchResults.css';

const SearchResults = () => {

  const articlesData = [
    { id: 1,
      title: 'Article 1',
      body: 'Texto texto texto'
    },
    { id: 2,
      title: 'Article 2',
      body: 'Texto texto texto'
    },
    { id: 3,
      title: 'Article 3',
      body: 'Texto texto texto'
    },
  ]

  const [articles, setArticles] = useState(articlesData); 

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
        (<div className="no-results">No results to show... Click create Articles</div>)
        }
      </div>
    </div>
  );
}
 
export default SearchResults;
 