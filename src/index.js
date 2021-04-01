const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

const app = express()
const port = 3000

const route = require('./routes')

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
})

// const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on("connection", function(socket){
    console.log('Co nguoi ket noi: ', socket.id );
    socket.on("disconnect", () => {
      console.log('Ngat ket noi: ', socket.id);
    })
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined'))

app.engine('hbs', handlebars({
  extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// router init
route(app)
