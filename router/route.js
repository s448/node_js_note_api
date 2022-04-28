var express = require('express');
var router = express.Router();
var ctrl = require('../controller/controller');
router.get('/notes',ctrl.getAllNotes);
router.post('/notes/save',ctrl.saveNote);
router.put('/notes/update',ctrl.updateNote);
router.delete('/notes/delete/:noteId',ctrl.deleteNote);

module.exports = router;