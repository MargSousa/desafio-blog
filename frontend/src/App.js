import React from 'react';
import UpdateArticle from './components/UpdateArticle/UpdateArticle';
import ButtonsSection from './components/ButtonsSection/ButtonsSection';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-top">
        <UpdateArticle />
        <ButtonsSection />
      </div>
      <div className="app-bottom">
        <SearchResults />
      </div>
    </div>
  );
}

export default App;
