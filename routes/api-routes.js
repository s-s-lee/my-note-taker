const fs = require('fs');
// const savedNotes = require('./db/db.json');
// unique id per uuid documentation
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    // GET route for all notes
    app.get('/api/notes', (req, res) => {
      console.log('Loading all notes');
      let notes = JSON.parse(fs.readFileSync('./db/db.json'));
      console.log('Here are the notes');
      res.json(notes);
    })

    // POST route for all notes
    app.post('/api/notes', (req, res) => {   
        const newNote = req.body;
        console.log('Creating new note');
        newNote.id = uuidv4();
        let notes = JSON.parse(fs.readFileSync('./db/db.json'));
        notes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        console.log('Saved new note!');
        res.json(notes);
    });   

    // DELETE route for a specific note
    app.delete('/api/notes/:id', (req, res) => {
        let getId = req.params.id.toString();
        console.log(`${getId} will be deleted`);
        let notes = JSON.parse(fs.readFileSync('./db/db.json'));
        const updatedNotes = notes.filter(note => note.id.toString() !== getId);
      
      fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
      console.log(`${getId} deleted successfully!`);
      res.json(updatedNotes);
  });
}