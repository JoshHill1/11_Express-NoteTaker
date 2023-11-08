const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const uuid = require('uuid');

notes.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

  notes.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const createNote = {title, text, id: uuid.v4()}
      readAndAppend(createNote, './db/db.json');
      res.json(`notes information added`);
    } else {
      res.error('creating no error');
    }
  });

module.exports = notes;