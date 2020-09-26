import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateArticle from './components/UpdateArticle/UpdateArticle';
import GetData from './components/GetData/GetData';
import SearchResults from './components/SearchResults/SearchResults';
import './App.css';

function App() {

  const [collection, setCollection] = useState([]);

  const handleCollection = (data) => {
    setCollection(data);
  }

  useEffect(() => {
    axios.get('/articles').then( res => {
      setCollection(res.data);
    })
  }, [])

  return (
    <div className="App">
      <div className="app-top">
        <UpdateArticle />
        <GetData />
      </div>
      <div className="app-bottom">
        <SearchResults collection={collection} />
      </div>
    </div>
  );
}

export default App;
