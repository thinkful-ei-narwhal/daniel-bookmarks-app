const bookmarks = [];
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

function applyFilter(filter) {
  this.filter = filter;
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
  applyFilter,
  findAndUpdate,
};