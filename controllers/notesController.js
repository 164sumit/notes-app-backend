const prisma = require('../prisma/client');

// Create a note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: req.user.id,
        tenantId: req.tenantId
      }
    });

    res.status(201).json({
      message: 'Note created successfully',
      note
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

// Get all notes for the tenant
const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { tenantId: req.tenantId },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ notes });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
};

// Get a specific note
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findFirst({
      where: {
        id,
        tenantId: req.tenantId
      },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ error: 'Failed to get note' });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Check if note exists and belongs to tenant
    const existingNote = await prisma.note.findFirst({
      where: {
        id,
        tenantId: req.tenantId
      }
    });

    if (!existingNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Only the creator or admin can update
    if (existingNote.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'You can only update your own notes' });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title: title || existingNote.title,
        content: content || existingNote.content
      }
    });

    res.json({
      message: 'Note updated successfully',
      note: updatedNote
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if note exists and belongs to tenant
    const existingNote = await prisma.note.findFirst({
      where: {
        id,
        tenantId: req.tenantId
      }
    });

    if (!existingNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Only the creator or admin can delete
    if (existingNote.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'You can only delete your own notes' });
    }

    await prisma.note.delete({
      where: { id }
    });

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};