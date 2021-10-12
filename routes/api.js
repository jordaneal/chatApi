// Dependancies
var express = require('express');
var router = express.Router();
var fs = require('fs');

// ---------------------------------------- start of Endpoints

// CRUD - Create Read Update Delete

// Read
router.get("/", function (req, res) {
    try {
        var rawData = fs.readFileSync('data.json'); // Raw Data
        var students = JSON.parse(rawData);
    
        console.log(students);

        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

// Create
router.post('/', function (req, res) {
    try {
        console.log("Posted Object Is: ", req.body);

        // Open File
        const rawData = fs.readFileSync('data.json');
        
        // Decode (parse) File
        var students = JSON.parse(rawData);

        // add data, but controlled
        var rawBody = req.body;
        var newObj = {
            name: null,
            age: null,
        };

        if (rawBody.name != null) {
            newObj.name = rawBody.name;
        }
        if (rawBody.age != null) {
            newObj.age = rawBody.age;
        }

        // get the index

        newObj._id = students.length;

        // Add Object to Array
        students.push(newObj);

        // Save (write) to File
        const data = fs.writeFileSync('data.json', JSON.stringify(students));

        // Return Data
        res.status(201).json({students})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Update
router.patch('/:id', function(req, res) {
    try {
        console.log("Patched Object Is: ", req.params.id, req.body);

        // Open File
        const rawData = fs.readFileSync('data.json');

        // Decode (parse) File
        var students = JSON.parse(rawData);

        // add data, but controlled
        var id = req.params.id;
        var rawBody = req.body;

        if (rawBody.name != null) {
            students[id].name = rawBody.name;
        }
        if (rawBody.age != null) {
            students[id].age = rawBody.age;
        }

        // Save (write) to File
        const data = fs.writeFileSync('data.json', JSON.stringify(students));

        // Return Data
        res.status(200).json(students[id])
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Delete
router.delete('/:id',  function(req, res) {
    // capture ID
    var id = req.params.id;

    // Open File
    const rawData = fs.readFileSync('data.json');
    // Decode (parse) File
    var students = JSON.parse(rawData);


    // if found, delete
    if (students.length > id) {

        // modify the object
        students.splice(id, 1);

        // write to file
        const data = fs.writeFileSync('data.json', JSON.stringify(students))
        res.status(200).json({ message: 'success'});
    }
    else {
        // fail
        res.status(500).json({ message: 'failed'});
    }
});
// ----------------------------------------- end of  Endpoints

module.exports = router;