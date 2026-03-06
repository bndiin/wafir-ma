import { prisma } from "@/lib/db";

export async function getAdminKpis() {
  try {
    const [totalLeads, totalUsers, totalPros, totalSimulations] = await Promise.all([
      prisma.lead.count(),
      prisma.user.count({ where: { role: "CLIENT" } }),
      prisma.proProfile.count(),
      prisma.simulation.count(),
    ]);

    const newLeadsToday = await prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    return { totalLeads, totalUsers, totalPros, totalSimulations, newLeadsToday };
  } catch {
    return { totalLeads: 0, totalUsers: 0, totalPros: 0, totalSimulations: 0, newLeadsToday: 0 };
  }
}

export async function getRecentLeads(limit = 10) {
  try {
    return await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        clientName: true,
        clientPhone: true,
        clientEmail: true,
        productType: true,
        source: true,
        quality: true,
        status: true,
        amount: true,
        createdAt: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getLeadsTrend(days = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const leads = await prisma.lead.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true, productType: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by date
    const grouped: Record<string, number> = {};
    leads.forEach((lead) => {
      const date = lead.createdAt.toISOString().split("T")[0];
      grouped[date] = (grouped[date] || 0) + 1;
    });

    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
  } catch {
    return [];
  }
}

export async function getLeadsByCategory() {
  try {
    const leads = await prisma.lead.groupBy({
      by: ["productType"],
      _count: { id: true },
    });
    return leads.map((l) => ({
      category: l.productType,
      count: l._count.id,
    }));
  } catch {
    return [];
  }
}
