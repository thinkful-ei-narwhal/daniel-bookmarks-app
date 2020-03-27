const bookmarks = [];
const adding = false;
const filter = 0;
const error = null;

function setError(err) {
  this.error = err;
}

function findById(id) {
  return this.items.find(item => item.id === id);
}

function addItem(item) {
  this.items.push(item);
}

function findAndUpdate(id, newData) {
  const item = this.findById(id);
  Object.assign(item, newData);
}

function findAndDelete(id) {
  this.items = this.items.filter(item => item.id !== id);
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
  addItem,
  findAndDelete,
  applyFilter,
  findAndUpdate,
};