1. 先查詢如何使用 session 和 cookie，查到可以使用 express-session 套件來操作 session，因此先下載以及載入套件
const session = require('express-session')
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    name: 'user'
}))
name: 'user' 設定了寫入 cookies 內的名稱

2. 要在登入時將資料寫入 session，在 /login 的路由內加入
req.session.user = user.firstName
session 中就會寫入 user:  firstName，同時 cookies 也會新增 user: sessionID

3. 修改首頁路由
if (req.session.user) {
    res.render('welcome', { name: req.session.user })
  } else {
    res.render('index')
  }
如果 req.session.user  存在，就會直接導向 welcome 頁面

4. 最後在 welcome 頁面新增了 logout 按鈕，並新增 logout 路由， 在登出時清除 session，並導回首頁 
req.session.destroy(() => {
    console.log('destroy session')
  })
  res.redirect('/')
