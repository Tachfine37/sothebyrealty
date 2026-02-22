// Simple script to create SiteSettings table directly
const { Client } = require('pg');
const fs = require('fs');

// Read .env file manually
const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) envVars[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
});

async function main() {
    const directUrl = envVars['DIRECT_URL'];
    if (!directUrl) {
        console.error('DIRECT_URL not found in .env');
        process.exit(1);
    }
    console.log('Using URL:', directUrl.substring(0, 50) + '...');

    const client = new Client({ connectionString: directUrl });

    try {
        await client.connect();
        console.log('Connected to database');

        await client.query(`
            CREATE TABLE IF NOT EXISTS "SiteSettings" (
                "id" TEXT NOT NULL DEFAULT 'singleton',
                "whatsappEnabled" BOOLEAN NOT NULL DEFAULT false,
                "whatsappNumber" TEXT NOT NULL DEFAULT '',
                "whatsappMessage" TEXT NOT NULL DEFAULT '',
                "whatsappPosition" TEXT NOT NULL DEFAULT 'right',
                "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
            );
        `);
        console.log('Table created (or already exists)');

        await client.query(`
            INSERT INTO "SiteSettings" ("id", "whatsappEnabled", "whatsappNumber", "whatsappMessage", "whatsappPosition", "updatedAt")
            VALUES ('singleton', false, '', '', 'right', CURRENT_TIMESTAMP)
            ON CONFLICT ("id") DO NOTHING;
        `);
        console.log('Singleton row ensured');

        const result = await client.query('SELECT * FROM "SiteSettings" WHERE id = $1', ['singleton']);
        console.log('Current settings:', result.rows[0]);

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

main();
