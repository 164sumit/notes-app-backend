const express = require('express');
const { upgradeSubscription } = require('../controllers/subscriptionController');
const authenticate = require('../middleware/auth');
const { requireAdmin } = require('../middleware/rbac');
const { ensureTenantAccess, validateTenantSlug } = require('../middleware/tenantIsolation');

const router = express.Router();

// All subscription routes require authentication and tenant access
router.use(authenticate);
router.use(ensureTenantAccess);

// Upgrade subscription (ADMIN role)
router.post('/:slug/upgrade', validateTenantSlug, requireAdmin, upgradeSubscription);

module.exports = router;