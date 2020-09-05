// Book Constructor
function Book(title, author, rating) {
   this.title = title;
   this.author = author; 
   this.rating = rating;
}

// UI Constructor
function UI() { }

// Add book to list
UI.prototype.addBookToList = function (book) {
   const list = document.getElementById('book-list'); 
   
   // Create tr element
   const row = document.createElement('tr'); 

   // Insert columns
   row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.rating}</td>
      <td><a href="#" class="delete">X</a></td>
   `

   list.appendChild(row); 
}

// Show alert
UI.prototype.showAlert = function (message, className) {
   // Create div
   const div = document.createElement('div');
   div.className = `alert ${className}`;
   div.appendChild(document.createTextNode(message));

   const container = document.querySelector('.container');

   const form = document.querySelector('#book-form');

   // Insert alert
   container.insertBefore(div, form);

   // Timeout after 3 seconds 
   setTimeout(function () {
      document.querySelector('.alert').remove();
   }, 3000);
}

// Clear fields
UI.prototype.clearFields = function () {
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('rating').value = '';
}

// Event Listeners 
document.getElementById('book-form').addEventListener('submit', function (e) {
   // Get form values
   const title = document.getElementById('title').value, 
      author = document.getElementById('author').value, 
      rating = document.getElementById('rating').value

   // Instantiate book
   const book = new Book(title, author, rating);

   // Instantiate UI
   const ui = new UI();

   // Validate
   if (title === '' || author === '' || rating === '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error')
   } else {
      // Add book to list
      ui.addBookToList(book); 

      // Show success 
      ui.showAlert('Book added!', 'success'); 
      // Clear fields
      ui.clearFields();
   }


   e.preventDefault(); 
});