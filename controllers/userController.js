const bcrypt = require('bcryptjs');
const prisma = require('../prisma/client');

const inviteUser = async (req, res) => {
  try {
    const { email, role = 'MEMBER' } = req.body;

    // Only admins can invite users
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only admins can invite users' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user with default password
    const hashedPassword = await bcrypt.hash('password', 10);
    
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        tenantId: req.tenantId
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(201).json({
      message: 'User invited successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Invite user error:', error);
    res.status(500).json({ error: 'Failed to invite user' });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { tenantId: req.tenantId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ users });
  } catch (error) {
    console.error('List users error:', error);
    res.status(500).json({ error: 'Failed to list users' });
  }
};

module.exports = {
  inviteUser,
  listUsers
};