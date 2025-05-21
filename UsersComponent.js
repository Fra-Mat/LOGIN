//importo le librerie
const fs = require("fs")
const bcrypt = require("bcrypt")

//creo la classe UsersComponent
class UsersComponent {

  //funzione constructor che viene chiamata quando creo una nuova istanza della classe
  //prendo come parametro il path del file.json
  constructor(statePath) {
    this.users = {} //creo un oggetto vuoto
    this.statePath = statePath
    try {
      //verifico se esiste il file.json e ne parso i dati da stringa-json a oggetto
      this.users = JSON.parse(fs.readFileSync(statePath, "utf-8"))
    }catch(err){
      console.log(err.message)
      this.serialize()//creo un nuovo file.json
    }
  }
  //la serializzazione è il processo di conversione di un oggetto in una stringa-json
  serialize() {
    //aggiorno o creo da zero il file.json
    fs.writeFileSync(this.statePath, JSON.stringify(this.users, null, 2))
  }

  getUser(email) {
    //partendo dalla mail ricerco lo user e lo restituisco
    return this.users[email]
  }

  async create(email, password) {

    console.log(password)

    const hash = await bcrypt.hash(password, 10)//hashing della password

    //creo l'istanza dello user partendo dalla chiave email
    //aggiungo email e password hashata
    this.users[email] = {
      email,
      hash
    }

    this.serialize()//aggiorno il file.json
  }

  async login(email, password) {
    //partendo dalla mail ricerco lo user
    const user = this.users[email]

    //se non esiste lo user restituisco null
    if (!user) {
      return null
    }
    //se lo user esiste controllo che la password sia giusta e restituisco lo user
    if (await bcrypt.compare(password, user.hash)) {
      return user
    }else{
      return null
    }
  }
}

module.exports = UsersComponent //esporto la classe UsersComponent per usare i metodi