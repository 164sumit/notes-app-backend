const prisma = require('../prisma/client');

const upgradeSubscription = async (req, res) => {
  try {
    const { slug } = req.params;

    // Check if user has ADMIN role
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
      data: { plan: 'PRO' },
    });

    res.json({
      message: 'Tenant upgraded successfully',
      tenant: {
        id: updatedTenant.id,
        slug: updatedTenant.slug,
        name: updatedTenant.name,
        plan: updatedTenant.plan,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upgrade subscription' });
  }
};

module.exports = {
  upgradeSubscription,
};