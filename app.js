// Book Constructor
function Book(title, author, isbn, rating) {
   this.title = title;
   this.author = author; 
   this.isbn = isbn; 
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
      <td>${book.isbn}</td>
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

// Delete book
UI.prototype.deleteBook = function(target) {
   if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
   }
}

// Clear fields
UI.prototype.clearFields = function () {
   document.getElementById('title').value = '';
   document.getElementById('author').value = '';
   document.getElementById('isbn').value = '';
   document.getElementById('rating').value = '';
}

// Event Listener -- Add Book 
document.getElementById('book-form').addEventListener('submit', function (e) {
   // Get form values
   const title = document.getElementById('title').value, 
      author = document.getElementById('author').value, 
      isbn = document.getElementById('isbn').value, 
      rating = document.getElementById('rating').value

   // Instantiate book
   const book = new Book(title, author, isbn, rating);

   // Instantiate UI
   const ui = new UI();

   // Validate
   if (title === '' || author === '' || isbn === '' || rating === '') {
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

// Event Listener -- Delete Book 
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
   const ui = new UI();
  
   ui.deleteBook(e.target); 

   // Show message
   ui.showAlert('Book removed!', 'success'); 

   e.preventDefault();
})