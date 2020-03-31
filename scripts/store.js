const bookmarks = [];
const bookmarksTemp = [];
const adding = false;
const filter = 0;
const error = null;

function setError(err) {
  this.error = err;
}

function findById(id) {
  return this.bookmarks.find(bookmark => bookmark.id === id);
}

function addBookmark(bookmark) {
  bookmark.expanded = false;
  this.bookmarks.push(bookmark);
}

function findAndUpdate(id, newData) {
  const bookmark = this.findById(id);
  Object.assign(bookmark, newData);
}

function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(item => item.id !== id);
}

function sortByFilter(number) {
  if (number === 0) {
    if (this.bookmarksTemp){
      this.bookmarks = this.bookmarksTemp.sort((a, b) => a.rating - b.rating);
    }
    return this.bookmarks.sort((a, b) => a.rating - b.rating);
  } if (number === 1) {
    if (this.bookmarksTemp){
      this.bookmarks = this.bookmarksTemp.sort((a, b) => b.rating - a.rating);
    }
    return this.bookmarks.sort((a, b) => b.rating - a.rating);
  } if (number === 2) {
    if (this.bookmarksTemp){
      this.bookmarks = this.bookmarksTemp.sort(function(a, b) {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    return this.bookmarks.sort(function(a, b) {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  } if (number === 3) {
    if (this.bookmarksTemp){
      this.bookmarks = this.bookmarksTemp.sort(function(a, b) {
        let nameA = a.title.toUpperCase();
        let nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
    }
    return this.bookmarks.sort(function(a, b) {
      let nameA = a.title.toUpperCase();
      let nameB = b.title.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
  } if (number === 4) {
    if (!this.bookmarksTemp){
      this.bookmarksTemp = this.bookmarks;
    }
    this.bookmarks = this.bookmarksTemp;
    const element = this.bookmarks.find(el => el.expanded === true);
    if (element) {
      this.bookmarks = this.bookmarks.filter(el => Number(el.rating) >= Number(element.rating));
      return this.bookmarks;
    }
  } if (number === 5) {
    if (!this.bookmarksTemp){
      this.bookmarksTemp = this.bookmarks;
    }
    this.bookmarks = this.bookmarksTemp;
    const element = this.bookmarks.find(el => el.expanded === true);
    if (element) {
      this.bookmarks = this.bookmarks.filter(el => Number(el.rating) <= Number(element.rating));
      return this.bookmarks;
    }
  } if (number === 6) {
    if (!this.bookmarksTemp){
      this.bookmarksTemp = this.bookmarks;
    }
    this.bookmarks = this.bookmarksTemp;
    this.bookmarks = this.bookmarks.filter(el => Number(el.rating) >= 1);
    return this.bookmarks;
  } if (number === 7) {
    if (!this.bookmarksTemp){
      this.bookmarksTemp = this.bookmarks;
    }
    this.bookmarks = this.bookmarksTemp;
    this.bookmarks = this.bookmarks.filter(el => Number(el.rating) >= 2);
    return this.bookmarks;
  } if (number === 8) {
    if (!this.bookmarksTemp){
      this.bookmarksTemp = this.bookmarks;
    }
    this.bookmarks = this.bookmarksTemp;
    this.bookmarks = this.bookmarks.filter(el => Number(el.rating) >= 3);
    return this.bookmarks;
  } if (number === 9) {
    if (!this.bookmarksTemp){
      this.bookmarksTemp = this.bookmarks;
    }
    this.bookmarks = this.bookmarksTemp;
    this.bookmarks = this.bookmarks.filter(el => Number(el.rating) >= 4);
    return this.bookmarks;
  } if (number === 10) {
    if (!this.bookmarksTemp){
      this.bookmarksTemp = this.bookmarks;
    }
    this.bookmarks = this.bookmarksTemp;
    this.bookmarks = this.bookmarks.filter(el => Number(el.rating) >= 5);
    return this.bookmarks;
  }
}


export default {
  bookmarks,
  adding,
  filter,
  error,
  setError,
  findById,
  addBookmark,
  findAndDelete,
  sortByFilter,
  findAndUpdate,
};