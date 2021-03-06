/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');
let itemsPerPage = 9;
let currentPage = 1;
var searchData = [];

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let startIndex = (+page * itemsPerPage) - itemsPerPage;
   let endIndex = +page * itemsPerPage;
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      // Creates 6 student li and appends them to the studentList ul
      if (i >= startIndex && i < endIndex) {
         createStudent(list, i);
      }

   }
}

function createStudent(list, i) {

   const student = list[i];

   const studentData = {
      li: {
         element: 'li',
         attr: [{ key: 'class', value: 'student-item cf' }]
      },
      studentDetails: {
         element: 'div',
         attr: [{ key: 'class', value: 'student-details' }]
      },
      avatar: {
         element: 'img',
         attr: [
            { key: 'class', value: 'avatar' },
            { key: 'src', value: student.picture.large },
            { key: 'alt', value: 'Profile Picture' },
         ]
      },
      studentName: {
         element: 'h3',
         content: `${student.name.first} ${student.name.last}`
      },
      studentEmail: {
         element: 'span',
         attr: [{ key: 'class', value: 'email' }],
         content: student.email
      },
      joinedDetails: {
         element: 'div',
         attr: [{ key: 'class', value: 'joined-details' }]
      },
      studentJoinDate: {
         element: 'span',
         attr: [{ key: 'class', value: 'date' }],
         content: `Joined ${student.registered.date}`
      }
   }

   // create li container and set its class
   const li = createElement(studentData.li);

   // created studentDetails container and set its class
   const studentDetails = createElement(studentData.studentDetails);

   // create student avatar, assign properties and append it to studentDetails
   const avatar = createElement(studentData.avatar);
   studentDetails.appendChild(avatar);

   // create student name, assign properties and append it to studentDetails
   const studentName = createElement(studentData.studentName);
   studentDetails.appendChild(studentName);

   // create student email, assign properties and append it to studentDetails
   const studentEmail = createElement(studentData.studentEmail);
   studentDetails.appendChild(studentEmail);

   // appent studentDetails to li
   li.appendChild(studentDetails);

   // create joinedDetail and assign properties
   const joinedDetails = createElement(studentData.joinedDetails);

   // create joinedDate, assign properties and append it to joinedDetail
   const studentJoinDate = createElement(studentData.studentJoinDate);
   joinedDetails.appendChild(studentJoinDate);

   // append joinedDetails to li
   li.appendChild(joinedDetails);

   // append li to studentList
   studentList.appendChild(li);
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const pageCount = Math.ceil(list.length / itemsPerPage);
   linkList.innerHTML = '';
   for (i = 1; i <= pageCount; i++) {

      // creates li which will contain the pagination button
      const li = document.createElement('li');

      // createButton and appends it to the li
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = i;
      if (currentPage == i) {
         button.classList = 'active';
      }
      li.appendChild(button);

      linkList.appendChild(li);

   }

}

// Listens to the pagination buttons
linkList.addEventListener("click", (e) => {
   if (e.target.tagName === 'BUTTON') {
      // removes class from the current active page
      const activeBtn = document.getElementsByClassName('active')[0];
      activeBtn.className = ''
      // assigns the active class to the new active page and reassigns currentPage value
      const button = e.target;
      button.classList = 'active';
      currentPage = +button.textContent;
      // removes studentList and calls the showPage with the updated parameters
      studentList.innerHTML = '';
      showPage(data, currentPage);
   }
});

// Adds the search filter on the top
function addSearch() {

   const search = {
      label: {
         element: 'label',
         attr: [
            { key: 'for', value: 'search' },
            { key: 'class', value: 'student-search' }
         ]
      },
      input: {
         element: 'input',
         attr: [
            { key: 'id', value: 'search' },
            { key: 'placeholder', value: 'Search...' }
         ]
      },
      button: {
         element: 'button',
         attr: [
            { key: 'type', value: 'button' }
         ]
      },
      icon: {
         element: 'img',
         attr: [
            { key: 'src', value: 'img/icn-search.svg' },
            { key: 'alt', value: 'Search Icon' }
         ]
      }
   }

   // create label
   const searchLabel = createElement(search.label);

   // create input
   const searchInput = createElement(search.input);
   searchLabel.appendChild(searchInput);

   // create button
   const searchBtn = createElement(search.button);
   searchLabel.appendChild(searchBtn);

   // create img
   const searchIcon = createElement(search.icon);
   searchBtn.appendChild(searchIcon);

   header.appendChild(searchLabel);
}

// Listens for search button click
header.addEventListener("click", (e) => {
   if (e.target.tagName === 'BUTTON') {
      const searchCriteria = document.getElementById('search');
      searchData = [];
      if (searchCriteria.value) {
         for (let i = 0; i < data.length; i++) {
            // Concatenation of all student values to avoid looping through the object
            const studentData = `${data[i].name.title} ${data[i].name.first} ${data[i].name.last} ${data[i].email} ${data[i].registered.date}`;
            // compares the concatenated values with the search criteria
            if (studentData.toUpperCase().indexOf(searchCriteria.value.toUpperCase()) > -1) {
               // checks if searchData doesnt have the current student object and adds it to searchData array
               if (!searchData.includes(data[i])) {
                  searchData.push(data[i]);
               }
            }
         }

      } else {
         searchData = data;
      }

      addResults();
      showPage(searchData, 1);
      addPagination(searchData);
   }
});

// this function adds a description showing 
function addResults() {
   const searchCriteria = document.getElementById('search').value;
   const results = document.querySelector('.search-results');
   if (results) {
      results.remove();
   }

   if (searchCriteria) {

      const searchInfo = document.createElement('div');
      searchInfo.className = 'search-results';
      const span = document.createElement('span');

      // Shows the user the search value and QTY found or tells the users that no results were found
      if (searchData.length > 0) {
         span.textContent = `Showing ${searchData.length} results for "${searchCriteria}"`;
      } else {
         span.textContent = 'No results found!'
      }
      searchInfo.appendChild(span);

      studentList.parentNode.insertBefore(searchInfo, studentList);

   }

}

// this function accepts an object as a parameter and returns an element with its properties
function createElement(element) {
   const ele = document.createElement(element.element);
   if (element.attr) {
      for (let i = 0; i < element.attr.length; i++) {
         ele.setAttribute(element.attr[i].key, element.attr[i].value);
      }
   }
   if (element.content) {
      ele.textContent = element.content;
   }
   return ele;
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearch();

