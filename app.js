var createButton = document.getElementById('createButton');
var email = document.getElementById('email');
createButton.addEventListener('click', function(ev){
  ev.preventDefault();
  fetch('/api/customers', {
    method: 'POST',
    body: JSON.stringify({ email: email.value }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then( response => {
      if(!response.ok){
        throw response.json();
      }
      return response.json();
    })
    .then( customer=> {
      console.log(customer);
      email.value = '';
      addCustomerToList(customer);
    })
    .catch((ex)=> {
      ex.then((er)=> {
        var message = document.getElementById('message');
        message.innerHTML = er.error.errors[0].message;
      });
    });
});

function addCustomerToList(customer){
  var message = document.getElementById('message');
  message.innerHTML = '';
  var ul = document.getElementById('customerList');
  var li= document.createElement('li');
  li.append(customer.email);
  li.addEventListener('click', ()=> {
    fetch(`/api/customers/${customer.id}`, {
      method: 'delete'
    })
    .then(()=> li.remove()) 
  });
  ul.append(li);
}

function init(){
  fetch('/api/customers')
    .then( result => result.json())
    .then( customers => {
      customers.forEach( customer => {
        addCustomerToList(customer);
      });
    })
}
init();
