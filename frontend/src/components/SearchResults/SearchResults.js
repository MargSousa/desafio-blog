import React from 'react';
import './SearchResults.css';

const SearchResults = (props) => {

  const { collection } = props;

  return (
    <div className="SearchResults">
      <div className="main-title">Search Results</div>
      <div className="results-cards">

        { collection.length > 0 ?
          (collection.map(article => 
            <div className="card" key={article._id}>
              <div className="card-title">Article {article.id} - {article.title}</div>
              <div className="card-text">{article.body}</div>
            </div>
          ))
        :
          (<div className="no-results">No results to show...</div>)
        }
      </div>
    </div>
  );
}
 
export default SearchResults;
 