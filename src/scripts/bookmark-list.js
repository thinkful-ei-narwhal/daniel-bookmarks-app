import $ from 'jquery';
import api from './api';
import store from './store';


// Generator Functions ()



// Render Functions (error, form, MAIN)

const errorRender = function() {
  
};

const formRender = function() {
  
};

const render = function() {
  errorRender();
  
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