var generator = require('../utils/generator')
var memorystorage = require('../utils/memory')
var model = require('../model/note.model')
exports.getAllNotes = (req,res)=>{
    //generate new sequential Id when the function is called
    // var id = generator.generate();
    // //allocate a new memory location for {id and value}
    // memorystorage.storage.setItem(id,'value no. ' + id);
    // //create a var for the note model
    // var note = model.Note;
    // //create object of the note model
    // var noteObj = new note(id,"title","content","created by",new Date());
    // //return all memory storage keys and save them in keys list
    // var keys = memorystorage.getAllKeys(memorystorage.storage);
    // //return all values and save them in values list
    // var values = memorystorage.getAllValues(memorystorage.storage);
    //print the keys and values paired
    // console.log('key : '+JSON.stringify(keys)+"value : "+JSON.stringify(values));
    // //print the note object includes all values
    // //reslt => {"id":"001","title":"title","content":"content","createdBy":"created by","createdOn":"2022-04-28T12:01:26.450Z"}
    // console.log(JSON.stringify(noteObj));
    // //return all values in memory storage to show in the response of the API
    // //result in the response(browser) =>
    // //get all notes{"id":"001","title":"title","content":"content","createdBy":"created by","createdOn":"2022-04-28T12:11:08.375Z"}
    // res.send('get all notes'+JSON.stringify(noteObj));

    //create var and pass the stored values to it 
    //then return it in status code 200
    var values = memorystorage.getAllValues(memorystorage.storage);
    return res.status(200).send(JSON.stringify(values));
}

exports.saveNote = (req,res) =>{
    //create all required vars
    var seqId = generator.generate();
    var createdBy = "";
    var createdOn = new Date();
    //req.body vars
    var title = req.body.title;
    var content = req.body.content;
    //should make a check line to make sure that title and content etc.. are not empty
    if (!title || !content) {
        return res.status(500).send({error:"title and conent cannot be empty"});
    }
    //create note object
    var note = model.Note;
    var noteObj = new model.Note(seqId,title,content,createdBy,createdOn);
    //save the created note in the memory storage 
    memorystorage.storage.setItem(seqId,noteObj);
    //after every thing is done successfully we return status code 201
    return res.status(201).send('Save notes');
}

exports.updateNote = (req,res) =>{
      //create all required vars
      var noteId = req.body.noteId;
      var createdBy = "";
      var createdOn = new Date();
      //req.body vars
      var title = req.body.title;
      var content = req.body.content;
      //should make a check line to make sure that title and content etc.. are not empty
      if (!noteId) {
        return res.status(500).send({error:"Note with this Id doesn't exist"});
      }
      if (!title || !content) {
          return res.status(500).send({error:"title and conent cannot be empty"});
      }
      var noteItem = memorystorage.storage.getItem(noteId);
      if (!noteItem) {
        return res.status(500).send({error:"Note doesn't exist"});          
      }
      //create note object
      var note = model.Note;
      var noteObj = new model.Note(noteId,title,content,createdBy,createdOn);
      //update the created note in the memory storage 
      memorystorage.storage.setItem(noteId,noteObj);
      //after every thing is done successfully we return status code 201
      return res.status(201).send('Save update');
}

exports.deleteNote = (req,res) =>{
    var noteId = req.params.noteId;
    if (!noteId) {
        return res.status(500).send({error:"param : noteId doesn't exist"});
    }

    var noteItem = memorystorage.storage.getItem(noteId);
    if (!noteItem) {
        return res.status(500).send({error:"Item doesn't exist"});
    }

    memorystorage.storage.removeItem(noteId);
    return res.status(200).send("delete success");
}