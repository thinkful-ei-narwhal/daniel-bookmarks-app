import $ from 'jquery';
import api from './api';
import store from './store';

// {
//   id: 'x56w',
//   title: 'Title 1',
//   rating: 3,
//   url: 'http://www.title1.com',
//   description: 'lorem ipsum dolor sit',
//   expanded: false
// },


// Generator Functions ()

const generateMenuButtons = function() {
  return `
  <div class="buttons-menus">
      <div class="new-bookmark">
        <button type="button" class="new-button">+ New</button>
      </div>
      <div class="filter">
        <form id="filter-by">
          <fieldset>
            <div class="fix">
            <label for="select-filter">Filter By</label>
            <select id="select-filter">
              <option value="0">Min Rating</option>
              <option value="1">Max Rating</option>
              <option value="2">A - Z</option>
              <option value="3">Z - A</option>
              </select>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="bookmark-list">
      <ul class="list">
  `;
};

const generateBookmarkElement = function(bookmark) { // takes a bookmark object
  if (!bookmark.expanded) {
    return `
  <li class="js-item-element" data-item-id="${bookmark.id}">
    <div class="bookmark-item">
       <button type="button" class="button-item rating-${bookmark.rating}">${bookmark.title}</button>
    </div>
  </li>
  `;
  } else { // do I need to include bookmark.url in this somehow?  it'd be nice....
    return `
    <li class="js-item-element" data-item-id="${bookmark.id}">
    <div class="bookmark-item">
      <button type="button" class="button-item selected">${bookmark.title}/button>
      <div class="description-container">
        <button type="button" class="link-button rating-${bookmark.rating}">Visit Site</button> 
        <button type="button" class="button-delete">X</button>
        <div class="description">
          <p>${bookmark.description}</p>
        </div>
      </div>
    </div>
    </li>
    `;
  }
};

const generateBookmarkItemsString = function(bookmarkList) {
  const items = bookmarkList.map(bookmark => generateBookmarkElement(bookmark));
  return items.join('');
};

const generateErrorHTML = function(error) {
  // return `
  // <div class="error-box">
  //   <button id="exit-err">X</button>
  //   <h3>Error: ${error}</h3>
  // </div>`;
};

// Render Functions (error, form, MAIN)

const errorRender = function() {
  
};

const formRender = function() {
  
};

const render = function() {
  errorRender();
  // Filter item list if store prop is true by item.checked === false
  let items = [...store.bookmarks];
  // make a string for the menu stuff
  const menuString = generateMenuButtons();
  // make a string for bookmark list
  const bookmarkListItemsString = generateBookmarkItemsString(items);
  // now they have a baby
  const fullString = `${menuString} ${bookmarkListItemsString}`;
  // insert that HTML into the DOM
  $('main').html(fullString);
};


// Event Handler Functions 
// (New Form Click, Filter by Submit, Click item, Trash Click, 
// Visit site? Cancel Click, **Create Item SUBMIT**)

const createItemSubmitListener = function() {

};

const newFormClickListener = function() {

};

const filterSubmitListener = function() {

};

const itemExpandClickListener = function() {

};

const itemDeleteClickListener = function() {

};

const cancelFormClickListener = function() {

};

// Event Binders 

const bindEventListeners = function() {
  createItemSubmitListener();
  newFormClickListener();
  filterSubmitListener();
  itemExpandClickListener();
  itemDeleteClickListener();
  cancelFormClickListener();
};

// Export Default

export default {
  render,
  bindEventListeners
};