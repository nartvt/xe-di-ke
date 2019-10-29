const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const useRoute = require("./Routes/UserRoute");

const app = express();


app.use(bodyParser.urlencoded())

app.use('/users', useRoute);

//--------------------------------
mongoose.connect('mongodb://temo:temo@localhost:27017/admin?retryWrites=true&w=majority',
//mongoose.connect('mongodb://temo:temo@localhost:27017/xedike?retryWrites=true&w=majority',  
{
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
).then(() => {
  console.log('connected');
  app.listen(8888);

});
