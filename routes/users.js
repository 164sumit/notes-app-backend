const express = require('express');
const { inviteUser, listUsers } = require('../controllers/userController');
const authenticate = require('../middleware/auth');
const { requireAdmin } = require('../middleware/rbac');
const { ensureTenantAccess } = require('../middleware/tenantIsolation');

const router = express.Router();

// All user routes require authentication
router.use(authenticate);
router.use(ensureTenantAccess);

// List users (any authenticated user)
router.get('/', listUsers);

// Invite user (admin only)
router.post('/invite', requireAdmin, inviteUser);

module.exports = router;