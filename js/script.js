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
let itemsPerPage = 9;
let currentPage = 1;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let startIndex = (+page * itemsPerPage) - itemsPerPage;
   let endIndex = +page * itemsPerPage;

   for (let i = 0; i < list.length; i++) {
      
      if (i >= startIndex && i < endIndex) {
         createStudent(list, i);
      }

   }

}

function createStudent(list, i) {
   

   const student = list[i];

   // create li container and set its class
   const li = document.createElement('li');
   li.className = 'student-item cf';

   // created studentDetails container and set its class
   const studentDetails = document.createElement('div');
   studentDetails.className = 'student-details';

   // create student avatar, assign properties and append it to studentDetails
   const avatar = document.createElement('img');
   avatar.className = 'avatar';
   avatar.setAttribute('src', student.picture.large);
   avatar.setAttribute('alt', 'Profile Picture');
   studentDetails.appendChild(avatar);
   
   // create student name, assign properties and append it to studentDetails
   const studentName = document.createElement('h3');
   studentName.textContent = `${student.name.first} ${student.name.last}`;
   studentDetails.appendChild(studentName);
   
   // create student email, assign properties and append it to studentDetails
   const studentEmail = document.createElement('span');
   studentEmail.className = 'email';
   studentEmail.textContent = student.email;
   studentDetails.appendChild(studentEmail);

   // appent studentDetails to li
   li.appendChild(studentDetails);

   // create joinedDetail and assign properties
   const joinedDetails = document.createElement('div');
   joinedDetails.className = 'joined-details';

   // create joinedDate, assign properties and append it to joinedDetail
   const studentJoinDate = document.createElement('span');
   studentJoinDate.className = 'date';
   studentJoinDate.textContent = `Joined ${student.registered.date}`;
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

   for (i = 1; i < pageCount; i++) {

      // create li
      const li = document.createElement('li');
   
      // createButton
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

linkList.addEventListener("click", (e) => {
   if (e.target.tagName === 'BUTTON') {

      const activeBtn = document.getElementsByClassName('active')[0];
      activeBtn.className = ''

      const button = e.target;
      button.classList = 'active';
      currentPage = +button.textContent;

      studentList.innerHTML = '';
      showPage(data, currentPage);
   }
});


// Call functions
showPage(data, 1);
addPagination(data);