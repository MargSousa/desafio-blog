import React, { useState } from 'react';
import axios from 'axios';

const GetData = (props) => {

  const [search, setSearch] = useState('');  

  const getRandomResults = async () => {
    let collectionData = [];
    let randomUsers = [];
    let randomPosts = [];

    for (let i = 0; i < 20; i++) {
      randomUsers.push(Math.floor(Math.random() * 9) + 1)
      randomPosts.push(Math.floor(Math.random() * 9));
    };

    await axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      randomUsers.map(id => {
        const data = res.data.filter(user => user.id === id);
        return collectionData.push(data[0]);
      })
    });

    await axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(res => collectionData = collectionData.map(user => ({ ...user, image_url: res.data[user.id].thumbnailUrl })))


    await axios.get('https://jsonplaceholder.typicode.com/photos')
    .then(res => collectionData = collectionData.map(user => ({ ...user, image_url: res.data[user.id].thumbnailUrl })))

    for (let i = 0; i < 20; i++) {
      await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${randomUsers[i]}`)
      .then(res => {
        collectionData[i].article = res.data[randomPosts[i]];
      })
    }
    return collectionData;
  }

  const deleteCollection = () => {
    props.delete();
  }

  const updateCollection = (input) => {
    props.collection(input);
  }

  const handleClick = (event) => {
    const { id } = event.target;

    if (id === "create") {
      getRandomResults().then(res => {
        axios.post('/articles/random', res)
        .then(res => { 
          console.log("Collections created");
          updateCollection(res.data);
        })
      });
    } else {
      axios.delete('/articles/all')
        .then(res => {
          if (res.status === 200) {
            console.log("Collections deleted")
            deleteCollection();
          }})
    }
  }

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);

    axios.get(`/articles?search=${value}`)
    .then(res => {
      updateCollection(res.data);
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`/articles?search=${search}`)
    .then(res => {
      updateCollection(res.data);
    })
  }

  return (
    <div className="ButtonsSection">
      <div className="top-sections">
        <button type="button" className="button button-create" id="create" onClick={handleClick}>Create Random Articles & Authors</button>
        <button type="button" className="button button-delete" id="delete" onClick={handleClick}>Delete All Articles & Authors</button>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Search by Article Title..." name="search" value={search} onChange={handleSearch}/>
          <button type="submit" className="button button-search">Search</button>
        </form>
      </div>
    </div>
  );
}
 
export default GetData;
 