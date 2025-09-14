const prisma = require('../prisma/client');

const checkNoteLimit = async (req, res, next) => {
  try {
    // Only check on note creation
    if (req.method !== 'POST' || !req.path.endsWith('/notes')) {
      return next();
    }

    // Get tenant info
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.tenantId },
      include: {
        _count: {
          select: { notes: true }
        }
      }
    });

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Check if tenant is on FREE plan and has reached limit
    if (tenant.plan === 'FREE' && tenant._count.notes >= 3) {
      return res.status(403).json({ 
        error: 'Note limit reached',
        message: 'Free plan is limited to 3 notes. Please upgrade to Pro for unlimited notes.',
        currentCount: tenant._count.notes,
        limit: 3,
        plan: tenant.plan
      });
    }

    // Add tenant plan info to request
    req.tenantPlan = tenant.plan;
    req.noteCount = tenant._count.notes;

    next();
  } catch (error) {
    console.error('Check note limit error:', error);
    res.status(500).json({ error: 'Failed to check note limit' });
  }
};

module.exports = {
  checkNoteLimit
};