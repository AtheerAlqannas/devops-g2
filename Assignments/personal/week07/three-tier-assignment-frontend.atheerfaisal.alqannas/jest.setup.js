// Mock jQuery
global.$ = global.jQuery = require("jquery");

// Mock fetch
global.fetch = jest.fn();

// Mock modal function
$.fn.modal = jest.fn();

// Mock document ready
$(document).ready = jest.fn((callback) => callback());

// Mock AJAX methods
$.ajax = jest.fn();
$.get = jest.fn();

// Mock DOM elements
document.body.innerHTML = `
  <div id="userTableBody"></div>
  <div id="messages"></div>
  <div id="modal-messages"></div>
  <div id="addEditUserModal"></div>
  <input id="name" />
  <input id="email" />
  <input id="age" />
  <input id="address" />
  <button id="addUserButton"></button>
  <button id="saveUserButton"></button>
`;
