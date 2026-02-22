const { PrismaClient } = require('@prisma/client');

const remainingRegions = [
    'eu-south-1', 'eu-south-2', 'eu-north-1',
    'us-east-2', 'ca-central-1',
    'ap-south-1', 'ap-southeast-1', 'ap-southeast-2',
    'ap-northeast-1', 'ap-northeast-2', 'sa-east-1'
];

async function checkRegion(region) {
    const url = `postgresql://postgres.fliztbqtyteyocmkjnme:Azertysd123%40@aws-0-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`;
    console.log(`Testing URL: ${url}`);
    const prisma = new PrismaClient({
        datasources: { db: { url } }
    });

    try {
        const res = await prisma.$queryRaw`SELECT 1`;
        console.log(`✅ SUCCESS IN REGION: ${region}`);
        console.log(`URL: ${url}`);
        return url;
    } catch (e) {
        if (e.message.includes("FATAL: Tenant or user not found") || e.message.includes("getaddrinfo ENOTFOUND")) {
            // Expected if wrong region
            console.log(`❌ Incorrect region: ${region}`);
        } else {
            console.log(`❌ Failed in ${region} with reason: ${e.message}`);
        }
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

async function main() {
    for (const region of remainingRegions) {
        const url = await checkRegion(region);
        if (url) {
            console.log("FOUND IT!");
            break;
        }
    }
}

main();
