var tab = require ('../vendor/bootstrap/js/tab');

$('.moves-list ul li a').on('click', function (event) {
  event.preventDefault();

  console.log('hello');

  $(this).tab('show');
});

console.log('hello');
