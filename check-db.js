const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        const val = match[2].trim().replace(/^['"](.*)['"]$/, '$1');
        process.env[match[1]] = val;
    }
});

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const allProps = await prisma.property.findMany();
    console.log(`Total properties: ${allProps.length}`);
    const featured = allProps.filter(p => p.featured && p.published);
    console.log(`Featured & published: ${featured.length}`);

    if (featured.length === 0 && allProps.length >= 3) {
        console.log('Setting first 3 properties to featured...');
        for (let i = 0; i < 3; i++) {
            await prisma.property.update({
                where: { id: allProps[i].id },
                data: { featured: true, published: true }
            });
        }
        console.log('Done.');
    } else if (allProps.length < 3) {
        console.log('Not enough properties to feature.');
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
