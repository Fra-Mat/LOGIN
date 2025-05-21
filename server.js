//importo le librerie
const express = require("express")  
const path = require("path")
const UsersComponent = require("./UsersComponent")//per usare i metodi della classe User

const app = new express() //nuova istanza (applicazione) del server con express
const PORT = 8080

const usersComponent = new UsersComponent("./state.json") //creo l'istanza della classe user e invoco il constructor

// Per abilitare il parsing delle form in formato urlencoded
app.use(express.urlencoded({ extended: true }))

// Middleware per servire i file statici
app.use(express.static("public"))

//RICHIESTE IN GET

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/login.html"))//invio la pagina di login
})

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/login.html"))//invio la pagina di login
})

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/signup.html"))//invio la pagina di signup
})

//RICHIESTE IN POST

app.post("/login", async (req, res) => {

  //prendo dal body della request il valore di mail e password
  const email = req.body.email
  const password = req.body.password

  //verifico se esiste uno user con la mail inserita
  if (!usersComponent.getUser(email)) {
    res.sendStatus(400)
  }else{
    const user = await usersComponent.login(email, password)//effettuo il login (metodo di User) per verificare se tutto coincide
    //se esiste l'utente invio la pagina home altrimenti errore 400
    if (user) {
        res.sendFile(path.join(__dirname, "./public/home.html"))
    } else {
      res.sendStatus(400)
    }
  }  
})

app.post("/signup", async (req, res) => {

  //prendo dal body della request il valore di mail e password
  const email = req.body.email
  const password = req.body.password
  console.log(password)

  //se esiste uno user con la mail inserita invio errore 400
  if (usersComponent.getUser(email)) {
    res.sendStatus(400)
  }else{
    await usersComponent.create(email, password) //creo un nuovo utente (metodo di User)
    //se l'utente è stato creato correttamente invio la pagina di successo
    res.sendFile(path.join(__dirname, "./public/success.html"))
  }
})

//in caso di errore generico invio la pagina 404
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "./public/404.html"))
})

//il server ascolta sulla porta 8080
app.listen(PORT, () => console.log("Il server è attivo sulla porta", PORT))
