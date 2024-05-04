
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const contactList = document.getElementById('contactList');
  
  // Function to add a new contact to the list
  function addContact(name, email, phone) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <strong>Name:</strong> ${name} <br>
      <strong>Email:</strong> ${email} <br>
      <strong>Phone:</strong> ${phone} <br>
      <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
      <button class="btn btn-primary btn-sm float-right edit-btn mr-2">Edit</button>
    `;
    contactList.appendChild(li);
  }

  // Function to validate email
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Function to validate phone number
  function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
  }

  // Event listener for form submission
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !phone){
      alert('Please fill out all fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Please enter a valid phone number (10 digits)');
      return;
    }

    addContact(name, email, phone);

    // Clear form fields after submission
    contactForm.reset();
  });

});

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const contactList = document.getElementById('contactList');
  
  // Function to add a new contact to the list
  function addContact(name, email, phone) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <strong>Name:</strong> ${name} <br>
      <strong>Email:</strong> ${email} <br>
      <strong>Phone:</strong> ${phone} <br>
      <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
      <button class="btn btn-primary btn-sm float-right edit-btn mr-2">Edit</button>
    `;
    contactList.appendChild(li);
    updateLocalStorage();
  }

  // Function to validate email
  function validateEmail(email){
    const re = /\S+@\S+\.\S+/;
    return re.test(email);}
// Function to validate phone number
function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
  }

  // Function to delete a contact
  function deleteContact(contact) {
    contact.remove();
    updateLocalStorage();
  }

  // Function to edit a contact
  function editContact(contact) {
    const name = prompt('Enter new name:');
    const email = prompt('Enter new email:');
    const phone = prompt('Enter new phone number:');
    
    if (!name || !email || !phone) {
      alert('Please fill out all fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Please enter a valid phone number (10 digits)');
      return;
    }

    const contactInfo = contact.querySelector('strong');
    contactInfo[0].textContent = `Name: ${name}`;
    contactInfo[1].textContent = `Email: ${email}`;
    contactInfo[2].textContent = `Phone: ${phone}`;

    updateLocalStorage();
  }

  // Event listener for form submission
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name ||!email || !phone) {
      alert('Please fill out all fields');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Please enter a valid phone number (10 digits)');
      return;
    }

    addContact(name, email, phone);

    // Clear form fields after submission
    contactForm.reset();
  });

  // Event delegation for delete and edit buttons
  contactList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
      deleteContact(e.target.parentElement);
    } else if (e.target.classList.contains('edit-btn')) {
      editContact(e.target.parentElement);
    }
  });

  // Function to update local storage with contact list data
  function updateLocalStorage() {
    const contacts = [];
    contactList.querySelectorAll('li').forEach(contact => {
      const name = contact.querySelector('strong:nth-child(1)').textContent.split(': ')[1];
      const email = contact.querySelector('strong:nth-child(2)').textContent.split(': ')[1];
      const phone = contact.querySelector('strong:nth-child(3)').textContent.split(': ')[1];
      contacts.push({ name, email, phone });
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  // Function to load contacts from local storage
  function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      contacts.forEach(contact => {
        addContact(contact.name, contact.email, contact.phone);
      });
    }
  }

  // Load contacts from local storage on page load
  loadContacts();
});
