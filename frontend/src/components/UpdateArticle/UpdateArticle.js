import React from 'react';
import axios from 'axios';

class UpdateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      body: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    axios.put(`/articles/${this.state.id}`, this.state)
    .then(res => {
      this.props.update();
      this.setState({
        id: '',
        title: '',
        body: ''
      })
    })
  }

  render() {
    const { id, title, body } = this.state;

    return (
      <div className="UpdateArticle">
        <div className="top-sections section-border">
          <div className="main-title">Update Article</div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="id" placeholder="Article Id" value={id} onChange={this.handleChange} />
            <input type="text" name="title" placeholder="Title" value={title} onChange={this.handleChange} />
            <textarea rows="3" name="body" placeholder="Body" value={body} onChange={this.handleChange} />
            <button type="submit" className="button button-update">Update Article</button>
          </form>
        </div>
      </div>
    );
    }
}
 
export default UpdateArticle;