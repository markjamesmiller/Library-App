function listItemTemplate (data) {
  var compiled = ''
  data.forEach(item => {
    compiled += `
        <li class="list-group-item">
          <strong>${item.title}</strong> - ${item.author}
          <span class="pull-right">
            <button type="button" class="btn btn-xs btn-default" onclick="handleEditBookClick(this)" data-book-id="${item._id}">Edit</button>
            <button type="button" class="btn btn-xs btn-default" onclick="handleDeleteBookClick(this)" data-book-id-delete="${item._id}">Delete</button>
          </span>
        </li>
      `
  })
  compiled = `<ul class="list-group">${compiled}</ul>`
  return compiled
}

function getBooks () {
  return $.ajax('/api/books')
    .then(res => {
      console.log('Results from getBooks()', res)
      return res
    })
    .fail(err => {
      console.log('Error in getBooks()', err)
      throw err
    })
}

function refreshBookList (e) {
    if (e)
    e.preventDefault()
  getBooks()
    .then(books => {
      window.bookList = books
      $('#list-container').html(listItemTemplate(books))
    })
}

function handleEditBookClick (element) {
  const bookId = element.getAttribute('data-book-id')

  const book = window.bookList.find(book => book._id === bookId)
  if (book) {
    setForm(book)
  }

  showAddBookForm()
}

function showAddBookForm () {
  $('#add-book-form').show()
}

function setForm (data) {
  data = data || {}
  const book = {
    authorID: data.author || '',
    titleID: data.title || '',
    _id: data._id || ''
  }

  $('#book-title').val(book.titleID)
  $('#book-author').val(book.authorID)
  $('#book-id').val(book._id)

  if (book._id) {
    $('#form-label').text('Edit book')
  } else {
    $('#form-label').text('Add book')
  }
}

function submitBookForm () {
  console.log("You clicked 'submit'. Congratulations.")

  const bookData = {
    titleID: $('#book-title').val(),
    authorID: $('#book-author').val(),
    _id: $('#book-id').val()
  }
console.log(bookData)
  let method, url
  if (bookData._id) {
    method = 'PUT'
    url = '/api/books/' + bookData._id
  } else {
    method = 'POST'
    url = '/api/books'
  }

  fetch(url, {
    method: method,
    body: JSON.stringify(bookData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(book => {
      console.log('we have updated the data', book)
      cancelBookForm()
      refreshBookList()
    })
    .catch(err => {
      console.error('A terrible thing has happened', err)
    })
}

function handleDeleteBookClick(element) {
  const bookId = element.getAttribute('data-book-id-delete');

if (confirm("Are you sure?")) {
    deleteBook(bookId);
  }
}

function deleteBook(bookId) {
  const url = '/api/books/' + bookId;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(response => {
      console.log("DOOOOOOOOOM!!!!!");
      
    })
    .catch(err => {
      console.error("I'm not dead yet!", err);
      refreshBookList()
    });
}

function addItem(){
	var ul = document.getElementById("title");
  var title = document.getElementById("author");
  var li = document.createElement("li");
  li.setAttribute('id',title.value);
  li.appendChild(document.createTextNode(title.value));
  ul.appendChild(li);
}