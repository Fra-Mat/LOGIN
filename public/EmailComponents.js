//importo le librerie
const fs = require("fs")
require("nodemailer")//libreria per inviare mail in nodejs
require("dotenv").config()

class UsersComponent {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
    }

  
}

module.exports = UsersComponent