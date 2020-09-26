import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateArticle from './components/UpdateArticle/UpdateArticle';
import GetData from './components/GetData/GetData';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';

function App() {

  const [collection, setCollection] = useState([]);

  const deleteCollection = () => {
    setCollection([]);
  }

  const getCollection = (input) => {
    setCollection(input);
  }

  const updateCollection = () => {
    axios.get('/articles').then( res => {
      setCollection(res.data);
    })
  }

  useEffect(() => {
    updateCollection();
  }, [])

  return (
    <div className="App">
      <div className="app-top">
        <UpdateArticle update={updateCollection} />
        <GetData delete={deleteCollection} collection={getCollection} />
      </div>
      <div className="app-bottom">
        <SearchResults collection={collection} />
      </div>
    </div>
  );
}

export default App;
