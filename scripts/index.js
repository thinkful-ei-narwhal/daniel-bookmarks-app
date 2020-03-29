import api from './api';
import bookmarkList from './bookmark-list';
import store from './store';

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