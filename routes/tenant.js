    const express = require('express');
    const { upgradeTenant, getTenantInfo } = require('../controllers/tenantController');
    const authenticate = require('../middleware/auth');
    const { requireAdmin } = require('../middleware/rbac');
    const { ensureTenantAccess, validateTenantSlug } = require('../middleware/tenantIsolation');

    const router = express.Router();

    // All tenant routes require authentication and tenant access
    router.use(authenticate);
    router.use(ensureTenantAccess);

    // Get tenant info
    router.get('/info', getTenantInfo);

    // Upgrade tenant (admin only)
    router.post('/:slug/upgrade', validateTenantSlug, requireAdmin, upgradeTenant);

    module.exports = router;