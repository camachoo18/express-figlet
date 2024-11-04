const express = require("express")
const { exec } = require('child_process');
const { quote } = require('shell-quote');
const RateLimit = require('express-rate-limit');


//const comando = "figlet hola mundo";
const app = express()
const port = 3000


app.use(express.static("public"))

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

app.use(limiter);

app.get("/", (req, res) =>{
    exec (comando, (error, stdout, stderr)=>{
        res.send(`<pre>${stdout}</pre>`);
    })
})

app.get("/ping", (req, res) => {
    const dominio = req.query.dominio || 'google.com';
    const comando = `ping -n 4 ${quote([dominio])}`;

    //ping -n 4 ${dominio}`   Comando para Windows
    //ping -c 4 ${dominio}`;  Comando para Unix/Linux

    exec(comando, (error, stdout) => {
        res.send(`<pre>${error ? `Error ejecutando ping: ${error.message}` : stdout}</pre>`);
    });
});


app.listen(port, ()=>{
    console.log("Hola estas en el puerto 3000")
})