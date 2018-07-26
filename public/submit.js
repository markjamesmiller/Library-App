let button = document.getElementById('submitButton');

button.addEventListener('click', function() {
  captureFormValue();
});

function captureFormValue() {
  let title = document.forms[0][0].value;
  let author = document.forms[0][1].value;


console.log('Title is ' + title);
console.log('Author is ' + author);
}