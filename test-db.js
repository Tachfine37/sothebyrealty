const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.fliztbqtyteyocmkjnme:Azertysd123%40@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log("Connection successful:", result);
  } catch (e) {
    console.error("Connection failed:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
