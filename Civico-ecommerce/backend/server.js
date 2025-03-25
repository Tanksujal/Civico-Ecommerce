const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const port = process.env.port

server.listen(port,(err)=>{
    if(err) console.log(err)
    console.log(`Server Running On The Port - ${port}`);
})