const express = require('express');
const app = express();
const PORT = 4000;

app.get('/test', (req,res) => {
    res.status(200).send({
        message: "I am working"
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})