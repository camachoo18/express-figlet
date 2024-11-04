const express = require("express")
const { exec } = require('child_process');


const comando = "figlet hola mundo";
const app = express()
const port = 3000




app.get("/", (req, res) =>{
    exec (comando, (error, stdout, stderr)=>{
        console.log(error, stdout, stderr)
        console.log(`Stdout: ${stdout}`);
        res.send(`<pre>${stdout}</pre>`);
    })
})

app.listen(port, ()=>{
    console.log("Hola estas en el puerto 3000")
})