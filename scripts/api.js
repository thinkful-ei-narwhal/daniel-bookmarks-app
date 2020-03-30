const BASE_URL = 'https://thinkful-list-api.herokuapp.com/daniel';

const apiFetch = function(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status};
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getBookmarks = function() {
  return apiFetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = function(item) {
  const newBookmark = JSON.stringify(item);
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: newBookmark
  };
  return apiFetch(`${BASE_URL}/bookmarks`, options);
};

const updateBookmark = function (id, updateData){
  const newData = JSON.stringify(updateData);
  const options = {
    method: 'PATCH',
    headers: {'content-type': 'application/json'},
    body: newData
  };
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, options);
};

const deleteBookmark = function(id) {
  const options = {
    method: 'DELETE',
  };
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, options);
};

export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
};