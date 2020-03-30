import api from './api.js';
import bookmarkList from './bookmark-list.js';
import store from './store.js';

const main = function() {

  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
      bookmarkList.render();
    });

  bookmarkList.bindEventListeners();
  bookmarkList.render();
};

$(main);