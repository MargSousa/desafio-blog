import React, { useState } from 'react';
import axios from 'axios';

const GetData = () => {

  const [search, setSearch] = useState(''); 

  const getRandomResults = async () => {
    let newData = [];
    for (let i = 0; i < 20; i++) {
      const randomUser = Math.floor(Math.random() * 9) + 1;
      const randomPost = Math.floor(Math.random() * 9);
      let users = [];
      let userData = [];
      let userImage = "";

      await axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => users = res.data);

      await axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        userImage = res.data[randomUser].thumbnailUrl;
      });

      await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${randomUser}`)
      .then(res => { 
        const user = users.filter(user => user.id === randomUser);
        userData = {
          name: user[0].name,
          email: user[0].email,
          image_url: userImage,
          address: {
            city: user[0].address.city,
            street: user[0].address.street,
          },
          article: res.data[randomPost]
        }
      });
      newData.push(userData);
    }
    return newData;
  }

  const handleClick = (event) => {
    const { id } = event.target;

    if (id === "create") {
      getRandomResults().then(res => {
        axios.post('/users', res)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            console.log("Collection created")
          }})
      });
    } else {
      axios.delete('/users')
        .then(res => {
          if (res.status === 200) {
            console.log("Collection deleted")
          }})
    }
  }

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`/articles?search=${search}`)
    .then(res => console.log("search done"))
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
 