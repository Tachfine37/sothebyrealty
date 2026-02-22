const { PrismaClient } = require('@prisma/client');

async function main() {
    const url = "postgresql://postgres.fliztbqtyteyocmkjnme:Azertyqsd123-@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
    console.log("Testing:", url);
    const prisma = new PrismaClient({
        datasources: { db: { url } }
    });

    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log("SUCCESS!");
    } catch (e) {
        console.error("FAILED:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
