const ensureTenantAccess = (req, res, next) => {
  // This middleware ensures all queries are scoped to the user's tenant
  if (!req.user || !req.user.tenantId) {
    return res.status(401).json({ error: 'Unauthorized: No tenant context' });
  }

  // Add tenant context to request for easy access
  req.tenantId = req.user.tenantId;
  req.tenantSlug = req.user.tenant.slug;
  
  next();
};

const validateTenantSlug = (req, res, next) => {
  // For routes that include tenant slug in URL
  const urlTenantSlug = req.params.slug;
  const userTenantSlug = req.user.tenant.slug;

  if (urlTenantSlug !== userTenantSlug) {
    return res.status(403).json({ error: 'Forbidden: Cannot access other tenant resources' });
  }

  next();
};

module.exports = {
  ensureTenantAccess,
  validateTenantSlug
};