// Dependancies
var express = require('express');
var router = express.Router();
var fs = require('fs');
const date = require('date-and-time');

// ---------------------------------------- start of Endpoints

// CRUD - Create Read Update Delete

// Create
router.post('/', function (req, res) {
    try {
        console.log("Posted: ", req.body);

        // Open File
        const rawData = fs.readFileSync('gamingData.json');
        
        // Decode (parse) File
        var chatLog = JSON.parse(rawData);

        // add data, but controlled
        var rawBody = req.body;
        var newObj = {
            message: null,
            author: null,
            timestamp: date.format(new Date(), 'hh:mm:ss A [GMT]Z MM/DD/YYYY')
        };

        if (rawBody.message != null) {
            newObj.message = rawBody.message;
        }
        if (rawBody.author != null) {
            newObj.author = rawBody.author;
        }

        // get the index

        newObj._id = chatLog.length;

        // Add Object to Array
        chatLog.push(newObj);

        // Save (write) to File
        const data = fs.writeFileSync('gamingData.json', JSON.stringify(chatLog));

        // Return Data
        res.status(201).json({chatLog: chatLog})
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
});

// Read
router.get("/", function (req, res) {
    try {
        var rawData = fs.readFileSync('gamingData.json'); // Raw Data
        var chatLog = JSON.parse(rawData);
    
        console.log(chatLog);

        res.status(200).json(chatLog);
    } catch (err) {
        res.status(500).json({Error: err.message})
    }
});

// Update
router.patch('/:id', function(req, res) {
    try {
        console.log("Patched: ", req.params.id, req.body);

        // Open File
        const rawData = fs.readFileSync('gamingData.json');

        // Decode (parse) File
        var chatLog = JSON.parse(rawData);

        // add data, but controlled
        var id = req.params.id;
        var rawBody = req.body;

        if (rawBody.message != null) {
            chatLog[id].message = rawBody.message;
        }
        if (rawBody.author != null) {
            chatLog[id].author = rawBody.author;
        }

        chatLog[id].timestamp = date.format(new Date(), 'hh:mm:ss A [GMT]Z MM/DD/YYYY');

        // Save (write) to File
        const data = fs.writeFileSync('gamingData.json', JSON.stringify(chatLog));

        // Return Data
        res.status(200).json(chatLog[id])
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
});

// Delete
router.delete('/:id',  function(req, res) {
    // capture ID
    var id = req.params.id;

    // Open File
    const rawData = fs.readFileSync('gamingData.json');
    // Decode (parse) File
    var chatLog = JSON.parse(rawData);

    // if found, delete
    if (chatLog.length > id) {

        // modify the object
        chatLog.splice(id, 1);

        // write to file
        const data = fs.writeFileSync('gamingData.json', JSON.stringify(chatLog))
        res.status(200).json({ message: 'Deleted ID: ' + id} );
    }
    else {
        // fail
        res.status(500).json({Error: err.message});
    }
});
// ----------------------------------------- end of  Endpoints

module.exports = router;