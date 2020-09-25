import React from 'react';

const ButtonsSection = () => {
  return (
    <div className="ButtonsSection">
      <div className="top-sections">
        <button type="button" className="button button-create">Create Random Articles & Authors</button>
        <button type="button" className="button button-delete">Delete All Articles & Authors</button>
        <form>
          <input type="text" placeholder="Search by Article Title..." name="search" />
          <button type="submit" className="button button-search">Search</button>
        </form>
      </div>
    </div>
  );
}
 
export default ButtonsSection;
 