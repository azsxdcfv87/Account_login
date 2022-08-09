const express = require('express')
const { urlencoded } = require("express")
const exphbrs = require('express-handlebars')
const session = require('express-session')
const userAuth = require('./user-authentication')
const app = express()
const PORT = 3000

app.engine('handlebars', exphbrs.engine({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: "I like Jasmine and it's a secret",
    resave: false,
    saveUninitialized: true
  })
)

app.get('/', (req, res) => {
  res.render('index')
})

app.post("/", (req, res) => {
  const { account, password } = req.body
  const user = userAuth.checkAccount(account)

  if (user) {
    if (userAuth.checkPassword(user, password)) {
      req.session.login = true
      user.sessionID = req.sessionID
      res.send(`<h1>Hello, ${user.firstName}</h1>`)
    } else {
      res.send("Please Check Your Password.")
    }
  } else {
    res.send("Account doesn't exist")
  }
})

app.listen(PORT, () => {
  console.log(`App is running http://localhost${PORT}`)
})
