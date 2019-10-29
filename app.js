const express = require('express')

const app = express();
app.use('/admin', (req, res, next) => {
  console.log('request  in middleware 1');
  res.send('<h1>Welcome to Admin</h1>')
  next();
})

app.use('/admin/user',(req, res, next) => {
  console.log('request  in middleware 2');
  res.send('<h1>User Management</h1>')
  next();
})
app.use((req, res, next) => {
  console.log('request  in middleware 1');
  res.send('<h1>Welcome to Express</h1>')
 
})
/**
 * 1. Application level
 * 2. Router level middleware
 * 
 */
app.listen(8888);