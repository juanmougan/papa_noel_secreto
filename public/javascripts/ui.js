// TODO this CAN'T be hardcoded!
// ... but I'm too lazy to use a template engine only for this ;)

const BASE_URL = 'http://localhost:4000';

const createRemoveButton = function() {
  const button = document.createElement('button');
  button.innerHTML = '-';
  // Add onClick behaviour
  button.addEventListener('click', function() {
    const li = this.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  });
  return button;
};

// TODO add validation roster > 1 person
const addToRoster = function() {
  console.log('addToRoster called');
  const addToRosterButton = document.getElementById('gifter-add-btn-id');
  const roster = document.getElementById('roster-ul');
  const personInput = document.getElementById('gifter-input-id');

  addToRosterButton.addEventListener(
    'click',
    function(e) {
      e.preventDefault();
      const personEmail = personInput.value.trim();
      // Create a <li> with a <span> holding the email
      //  and a <button> to remove it
      const listItem = document.createElement('li');
      const itemEmail = document.createElement('span');
      const removeButton = createRemoveButton();
      // Append the <span> y <button> to the <li>
      listItem.appendChild(itemEmail);
      listItem.appendChild(removeButton);
      // Append the text to the <span>
      const element = itemEmail.appendChild(
        document.createTextNode(personEmail)
      );
      roster.appendChild(listItem);
      personInput.value = '';
    },
    false
  );
};

const submitRoster = function() {
  console.log('submitRoster');
  const emailList = [];
  const ul = document.getElementById('roster-ul');
  for (li of ul.children) {
    emailList.push(li.children[0].innerText);
  }
  console.log('Email list:');
  console.log(emailList);
  const url = `${BASE_URL}/rosters`;
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(emailList),
    headers: {
      'Content-Type': 'application/json'
    }
    //credentials: "same-origin"    // TODO do I need this?
  }).then(
    function(response) {
      //console.log(`Status: ${response.status}`);     //=> number 100–599
      //response.statusText; //=> String
      //response.headers;    //=> Headers
      //response.url;        //=> String
      //console.log(`Response: ${response.text()}`);
      return response.text();
    },
    function(error) {
      error.message; //=> String
    }
  );
};

const handleFormSubmission = function() {
  const submit = document.getElementById('submit-btn-id');
  submit.addEventListener('click', function(e) {
    e.preventDefault();
    submitRoster();
  });
};

const getNodeindex = function(element) {
  const c = element.parentNode.children;
  let i = 0;
  for (; i < c.length; i++) if (c[i] == element) return i;
};

// TODO try to understand ES2015's version
/*
      function getNodeindex(elm) {
        return [...elm.parentNode.children].findIndex(c => c == elm);
        // or
        return [...elm.parentNode.children].indexOf(elm);
      }
      */

const removeAllFromRoster = function() {
  console.log('Remove all children');
  const ul = document.getElementById('roster-ul');
  ul.innerHTML = '';
};

const clearRoster = function() {
  const clear = document.getElementById('clear-roster');
  clear.addEventListener('click', function(e) {
    e.preventDefault();
    removeAllFromRoster();
  });
};

// try it
//var el = document.getElementById('sidebar');
//getNodeindex(el);

// Make sure DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM is loaded');
  addToRoster();
  handleFormSubmission();
  clearRoster();
});
