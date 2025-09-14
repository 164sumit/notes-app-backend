const express = require('express');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/notesController');
const authenticate = require('../middleware/auth');
const { ensureTenantAccess } = require('../middleware/tenantIsolation');
const { checkNoteLimit } = require('../middleware/subscription');

const router = express.Router();

// All note routes require authentication and tenant access
router.use(authenticate);
router.use(ensureTenantAccess);

// Routes
router.post('/', checkNoteLimit, createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;