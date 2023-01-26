const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//mongodb+srv://dygtzcn:<password>@dygtzcn.mzncl5b.mongodb.net/?retryWrites=true&w=majority

mongoose
    .connect('mongodb+srv://dygtzcn.mzncl5b.mongodb.net/',
        {
            dbName: 'restapi',
            user: 'dygtzcn',
            pass: 'c59c9a73',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => {
        console.log('Mongodb connected...')
    })

app.all('/test', (req, res) => {
    // console.log(req.query)
    // console.log(req.query.name)
    // res.send(req.query)
    // console.log(req.params);
    // res.send(req.params)
    console.log(req.body)
    res.send(req.body)
});

const ProductRoute = require('./Routes/Product.route')
app.use('/products', ProductRoute)


app.use((req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404
    next(err)
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000...')
})