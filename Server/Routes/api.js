let express = require("express")
let router = express.Router();
// to use values from the form 
let bodyParser = require("body-parser")
// for using mongoDB
let mongoClient = require("mongodb").MongoClient
let URL = 'mongodb://localhost:27017'
// get all books endpoint
router.get('/books', (_req, res) => {
    mongoClient.connect(URL).then((client) => {
        let books = []
        let db = client.db('library')
        db.collection("books").find().forEach(book => {
            books.push(book)
        }).then(() => {
            res.json(books)
            client.close()
        }).catch((err) => {
            console.log("the err in fetch data is :", err)
            res.send(`"the err in fetch data is : ${err}`)
        })
    }).catch((_err) => { console.log("Failed to connect to Mongo") })
})
// get book by id endpoint
router.get('/books/:id', (req, res) => {
    mongoClient.connect(URL).then((client) => {
        let db = client.db('library');
        let id = req.params.id
        db.collection('books').findOne({ id: id }).then((book) => {
            res.json(book)
        }).catch((err) => {
            console.log("Failed to find document from Mongo")
        })
    }).catch((err) => {
        res.send("Failed to connect")
    })
})
// post book endpoint
router.post('/books', bodyParser.urlencoded({ extended: true }), bodyParser.json(), (req, res) => {
    let newBook = req.body;
    mongoClient.connect(URL).then((client) => {
        db = client.db("library")
        db.collection("books").insertOne(newBook).then((result) => {
            res.json(result)
            client.close()
        }).catch((_err) => { res.send("Failed to insert") })
    }).catch((_err) => {
        res.send("Failed to connect")
    })
})

// delete book endpoint
router.delete('/books/:id', (req, res) => {
    mongoClient.connect(URL).then((client) => {
        let db = client.db('library');
        let idUrl = req.params.id
        db.collection('books').deleteOne({ id: idUrl }).then((result) => {
            res.json(result)
        }).catch((_err) => {
            console.log("Failed to delete document from Mongo")
        })
    }).catch((_err) => {
        res.send("Failed to connect")
    })
})
module.exports = router;