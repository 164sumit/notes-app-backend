const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userRole = req.user.role;
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

const requireAdmin = requireRole(['ADMIN']);
const requireMember = requireRole(['ADMIN', 'MEMBER']);

module.exports = {
  requireRole,
  requireAdmin,
  requireMember
};