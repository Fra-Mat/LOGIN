//ottengo password, conferma password e form(submit) con l'Id da Signup.html
var password = document.getElementById("password")
var confirm_password = document.getElementById("confirm_password")
var form = document.getElementById("registra")

//addEventListener sta in ascolto dell'evento submit ed eventualmente chiama la callback 
form.addEventListener("submit",(event)=> {
  //verifico se le password coincidono
  if(password.value != confirm_password.value){

    event.preventDefault() //evito che i dati escano dal form in quanto errati

    confirm_password.setCustomValidity("Le password non corrispondono."); //imposto una custom validity
    
    confirm_password.reportValidity(); //permette al form di mostrare la validity 

  }else{
    confirm_password.setCustomValidity(''); //imposto la validity null (non ci sono errori)
  }
})

//addEventListener sta in ascolto dell'evento input ed eventualmente chiama la callback 
confirm_password.addEventListener("input", () => {
  //verifico se le password coincidono
  if (password.value === confirm_password.value){
    confirm_password.setCustomValidity(''); //imposto la validity null (non ci sono errori)
  }
})

password.addEventListener("input", () => {
  if (confirm_password.value === password.value) {
    confirm_password.setCustomValidity('');
  }
})


//devo controllare l'input di password e confirm_password 
// altrimenti si blocca l'accesso