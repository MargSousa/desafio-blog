import React from 'react';
import UpdateArticle from './components/UpdateArticle/UpdateArticle';
import GetData from './components/GetData/GetData';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-top">
        <UpdateArticle />
        <GetData />
      </div>
      <div className="app-bottom">
        <SearchResults />
      </div>
    </div>
  );
}

export default App;
