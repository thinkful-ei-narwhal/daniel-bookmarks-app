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

// go back, make the visit button an href and style it like a button

// Filter functions

function minToMax(a, b) {
  return a.rating - b.rating;
}

function maxToMin(a, b) {
  return b.rating - a.rating;
}

function aToZ(a, b) {
  const titleA = a.title;
  const titleB = b.title;
  console.log(titleA);
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  // names must be equal
  return 0;
}

function zToA(a, b) {
  const titleA = a.title;
  const titleB = b.title;
  if (titleA < titleB) {
    return 1;
  }
  if (titleA > titleB) {
    return -1;
  }

  // names must be equal
  return 0;
}


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
    </div>`;
};

const generateBookmarkElement = function(bookmark) { // takes a bookmark object
  if (!bookmark.expanded) {
    return `
      <li class="js-item-element" data-item-id="${bookmark.id}">
        <div class="bookmark-item">
          <button type="button" class="button-item rating-${bookmark.rating}">${bookmark.title}</button>
        </div>
      </li>`;
  } else { // do I need to include bookmark.url in this somehow?  it'd be nice....
    return `
      <li class="js-item-element" data-item-id="${bookmark.id}">
        <div class="bookmark-item">
          <button type="button" class="button-item selected">${bookmark.title}</button>
            <div class="description-container">
              <button type="button" class="link-button rating-${bookmark.rating}">Visit Site</button> 
              <button type="button" class="button-delete">X</button>
              <div class="description">
                <p>${bookmark.desc}</p>
              </div>
            </div>
        </div>
      </li>`;
  }
};

const generateBookmarkItemsString = function(bookmarkList) {

  const items = bookmarkList.map(bookmark => generateBookmarkElement(bookmark));

  let joined = items.join('');

  const final = (`
  <div class="bookmark-list">
    <ul class="list">` + joined + `
    </ul>
  </div>`);
  return final;
};

const generateErrorHTML = function(error) {
  return `
  <div class="error-box">
    <button id="exit-err">X</button>
    <h3>Error: ${error}</h3>
  </div>`;
};

// Render Functions (error, form, MAIN)


const errorRender = function() {
  if (store.error) {
    const errorString = generateErrorHTML(store.error);
    // insert that HTML into the DOM
    $('.error-contain').html(errorString);
  } else {
    $('.error-contain').empty();
  }
};


const formRender = function() {
  return `
  <form id="bookmark-form">
  <label for="bookmark-url">Add New Bookmark URL:</label><br>
  <input type="text" id="bookmark-url" name="bookmark-form" placeholder="http://google.com"><br>
  <label for="bookmark-title">Title:</label><br>
  <input type="text" id="bookmark-title" name="bookmark-form" placeholder="Google"><br>
  <div class="rate">
    <input type="radio" id="star5" name="bookmark-rating" value="5" />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" name="bookmark-rating" value="4">
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" name="bookmark-rating" value="3">
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" name="bookmark-rating" value="2">
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" name="bookmark-rating" value="1">
    <label for="star1" title="text">1 star</label>
  </div>
  <textarea id="bookmark-description" placeholder="A description (optional)"></textarea><br>
  <div class="bottom-buttons">
    <button type="button" class="cancel-button">Go Back</button>
    <input type="submit" class="submit-button" value="Submit">
  </div>
</form>`;
};

const render = function() {
  errorRender();
  store.sortByFilter(store.filter);
  if (!store.adding) {
    const bookmarks = [...store.bookmarks];
    

    // make a string for the menu stuff
    const menuString = generateMenuButtons();
    // make a string for bookmark list
    const bookmarkListItemsString = generateBookmarkItemsString(bookmarks);
    // now they have a baby
    const fullString = `${menuString} ${bookmarkListItemsString}`;
    // insert that HTML into the DOM
    $('main').html(fullString);
    $('#select-filter').val(store.filter);
  } else {
    const fullString = formRender();
    $('main').html(fullString);
  }
};


// Event Handler Functions 
// (New Form Click, Filter by Submit, Click item, Trash Click, 
// Visit site? Cancel Click, **Create Item SUBMIT**)


const createItemSubmitListener = function() {

  $('main').on('submit', '#bookmark-form', event => {
    event.preventDefault();
    
    const url = $('#bookmark-form input[id=bookmark-url]').val();
    const title = $('#bookmark-form input[id=bookmark-title]').val();
    const rating = $('#bookmark-form input[name=bookmark-rating]:checked').val();
    const desc = $('#bookmark-form textarea[id=bookmark-description]').val();

    const newBookmarkThings = {
      title,
      url,
      desc,
      rating,
    };

    api.createBookmark(newBookmarkThings)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        render();
      })
      .catch((err) => {
        store.setError(err.message);
        render();
      });
  });
};

const newFormClickListener = function() {
  $('main').on('click', '.new-button', event => {
    console.log('clicked!');
    event.preventDefault();
    store.adding = true;
    render();
  });
};

const filterSubmitListener = function() {
  $('main').on('change', '#select-filter', function () {
    console.log('changed');
    let filterVal = $('option:selected').val();
    filterVal = Number(filterVal);
    store.filter = filterVal;
    render();
  });
};

const visitLinkListener = function() {

};

const getItemIdFromElement = function(item) {
  return $(item).closest('li').data('itemId');
};


const itemExpandClickListener = function() {
  $('main').on('click', '.button-item', event => {
    console.log('clicked');
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    console.log(bookmark);
    bookmark.expanded = !bookmark.expanded;
    render();
  });
};

const itemDeleteClickListener = function() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('main').on('click', '.button-delete', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((err) => {
        store.setError(err.message);
        render();
      });
  });
};

const cancelFormClickListener = function() {
  $('main').on('click', '.cancel-button', event => {
    console.log('clicked!');
    event.preventDefault();
    store.adding = false;
    render();
  });
};

const handleErrorExitClick = function() {
  $('.error-contain').on('click', '#exit-err', () => {
    store.setError(null);
    errorRender();
  });
};

// Event Binders 

const bindEventListeners = function() {
  createItemSubmitListener();
  newFormClickListener();
  filterSubmitListener();
  itemExpandClickListener();
  itemDeleteClickListener();
  cancelFormClickListener();
  visitLinkListener();
  handleErrorExitClick();
};

// Export Default

export default {
  render,
  bindEventListeners
};