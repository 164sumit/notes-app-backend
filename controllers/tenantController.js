const prisma = require('../prisma/client');

const upgradeTenant = async (req, res) => {
  try {
    const { slug } = req.params;

    // Check if user is admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only admins can upgrade subscriptions' });
    }

    // Verify the slug matches user's tenant
    if (slug !== req.user.tenant.slug) {
      return res.status(403).json({ error: 'Cannot upgrade other tenants' });
    }

    // Update tenant plan to PRO
    const updatedTenant = await prisma.tenant.update({
      where: { slug },
      data: { plan: 'PRO' }
    });

    res.json({
      message: 'Tenant upgraded successfully',
      tenant: {
        id: updatedTenant.id,
        slug: updatedTenant.slug,
        name: updatedTenant.name,
        plan: updatedTenant.plan
      }
    });
  } catch (error) {
    console.error('Upgrade error:', error);
    res.status(500).json({ error: 'Failed to upgrade tenant' });
  }
};

const getTenantInfo = async (req, res) => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.tenantId },
      include: {
        _count: {
          select: {
            users: true,
            notes: true
          }
        }
      }
    });

    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    res.json({
      id: tenant.id,
      slug: tenant.slug,
      name: tenant.name,
      plan: tenant.plan,
      userCount: tenant._count.users,
      noteCount: tenant._count.notes
    });
  } catch (error) {
    console.error('Get tenant error:', error);
    res.status(500).json({ error: 'Failed to get tenant info' });
  }
};

module.exports = {
  upgradeTenant,
  getTenantInfo
};