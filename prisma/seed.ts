import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Clean existing data
    await prisma.contactMessage.deleteMany();
    await prisma.propertyImage.deleteMany();
    await prisma.property.deleteMany();
    await prisma.agent.deleteMany();
    await prisma.user.deleteMany();

    // ── Users ──────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@sothebyrealty.fr',
            hashedPassword,
            name: 'Admin Sotheby',
            role: 'ADMIN',
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // ── Agents ─────────────────────────────────────────────
    const agentMH = await prisma.agent.create({
        data: {
            name: 'Marie-Hélène Fontaine',
            title: 'Directrice Générale',
            phone: '+33 1 44 77 88 99',
            email: 'mh.fontaine@sothebyrealty.fr',
            photo: '/uploads/agent-mh.jpg',
            bio: '25 ans d\'expérience en immobilier de luxe. Anciennement chez Christie\'s Real Estate et Knight Frank Paris.',
            territory: 'Paris & Île-de-France',
        },
    });
    const agentEB = await prisma.agent.create({
        data: {
            name: 'Étienne Beaumont',
            title: 'Directeur Côte d\'Azur',
            phone: '+33 4 93 22 44 55',
            email: 'e.beaumont@sothebyrealty.fr',
            photo: '/uploads/agent-eb.jpg',
            bio: 'Né à Nice, 20 ans sur la Riviera. Expert des marchés de Cap-Ferrat, Cannes et Saint-Tropez.',
            territory: 'Côte d\'Azur',
        },
    });
    const agentSM = await prisma.agent.create({
        data: {
            name: 'Sophie Marchand',
            title: 'Responsable International',
            phone: '+33 6 77 88 99 00',
            email: 's.marchand@sothebyrealty.fr',
            photo: '/uploads/agent-sm.jpg',
            bio: 'Trilingue (FR/EN/ZH), spécialiste des acheteurs étrangers. 15 ans à connecter les marchés européens et asiatiques.',
            territory: 'Alpes & International',
        },
    });
    console.log('✅ 3 agents created');

    // ── Properties ─────────────────────────────────────────
    const villa = await prisma.property.create({
        data: {
            slug: 'villa-cap-ferrat-vue-mer',
            title: 'Villa Prestige — Saint-Jean-Cap-Ferrat',
            description: `Nichée sur les hauteurs de Saint-Jean-Cap-Ferrat, cette villa d'exception offre une vue panoramique à 180° sur la Méditerranée. Entièrement rénovée par un architecte de renom, la propriété déploie ses 680 m² de surface habitable dans un cadre exceptionnel, à l'abri des regards, dans l'un des endroits les plus exclusifs de la Côte d'Azur.

Le masterplan architectural célèbre la lumière et la mer. Les espaces de vie — un grand salon de 120 m², une salle à manger de réception, une cuisine entièrement équipée signée Bulthaup — s'ouvrent sur de larges terrasses donnant sur la piscine à débordement et l'horizon méditerranéen.

Sept suites, toutes orientées mer, offrent la discrétion et le confort d'un palace. La suite master de 80 m² dispose d'une salle de bain en marbre de Carrare, d'un dressing privé et d'une terrasse exclusive. Un espace bien-être complet (hammam, sauna, salle de sport) et un garage pour 4 véhicules complètent cet ensemble d'exception.`,
            price: 12500000,
            surface: 680,
            rooms: 10,
            bedrooms: 7,
            bathrooms: 6,
            type: 'VILLA',
            destination: 'cote-dazur',
            city: 'Saint-Jean-Cap-Ferrat',
            address: 'Chemin des Oliviers, Cap-Ferrat',
            latitude: 43.6892,
            longitude: 7.3371,
            featured: true,
            published: true,
            badge: 'Exclusivité',
            dpe: 'C',
            charges: 3500,
            reference: 'SRF-CF-001',
            amenities: JSON.stringify([
                'Piscine à débordement',
                'Vue mer panoramique',
                'Hammam & Sauna',
                'Salle de sport',
                'Garage 4 voitures',
                'Système domotique',
                'Cuisine Bulthaup',
                'Gardien 24h',
                'Terrain 2 200 m²',
                'Accès plage privée',
                'Cave à vins',
                'Jacuzzi extérieur',
            ]),
            agentId: agentEB.id,
        },
    });
    await prisma.propertyImage.createMany({
        data: [
            { url: '/uploads/villa-cf-1.jpg', alt: 'Villa Cap-Ferrat piscine vue mer', order: 0, propertyId: villa.id },
            { url: '/uploads/villa-cf-2.jpg', alt: 'Salon principal avec vue panoramique', order: 1, propertyId: villa.id },
            { url: '/uploads/villa-cf-3.jpg', alt: 'Suite master avec terrasse privée', order: 2, propertyId: villa.id },
            { url: '/uploads/villa-cf-4.jpg', alt: 'Cuisine Bulthaup', order: 3, propertyId: villa.id },
        ],
    });

    const apartment = await prisma.property.create({
        data: {
            slug: 'appartement-paris-8eme-tour-eiffel',
            title: 'Appartement Haussmannien — Paris 8e, Vue Tour Eiffel',
            description: `Au cœur du triangle d'or parisien, cet appartement haussmannien d'exception offre un art de vivre incomparable dans l'un des immeubles de pierre de taille les plus prestigieux de l'Avenue Marceau. Au 4ème étage avec ascenseur, ce bien d'une rare qualité bénéficie d'une vue imprenable et directe sur la Tour Eiffel depuis ses pièces de réception.

Entièrement rénové par un architecte reconnu, l'appartement déploie ses 320 m² en un plan fluide et lumineux, préservant tous les éléments d'origine : parquet Versailles, moulures Napoléon III, cheminées en marbre de Carrare et hauteurs sous plafond de 3,80 m.

Le salon double de 80 m² aux trois fenêtres en façade donne sur la Tour Eiffel. La cuisine Bulthaup, prolongée d'un office de service, répond aux standards gastronomiques les plus exigeants. Cinq chambres, dont une suite parentale de 45 m² avec dressing et salle de bains privative entièrement marbrée.`,
            price: 7200000,
            surface: 320,
            rooms: 9,
            bedrooms: 5,
            bathrooms: 4,
            type: 'APPARTEMENT',
            destination: 'paris',
            city: 'Paris 8e',
            address: 'Avenue Marceau, Paris 75008',
            latitude: 48.8700,
            longitude: 2.3007,
            featured: true,
            published: true,
            badge: 'Vue Tour Eiffel',
            dpe: 'C',
            charges: 2800,
            reference: 'SRF-P8-001',
            amenities: JSON.stringify([
                'Vue Tour Eiffel directe',
                "Parquet Versailles d'origine",
                '3 Cheminées en marbre',
                'Cuisine Bulthaup',
                'Suite parentale 45 m²',
                'Dressing sur-mesure',
                '2 Parkings en sous-sol',
                'Cave voûtée',
                'Gardien 24h',
                'Ascenseur',
                'Climatisation réversible',
                'Domotique & home cinema',
            ]),
            agentId: agentMH.id,
        },
    });
    await prisma.propertyImage.createMany({
        data: [
            { url: '/uploads/apt-paris-1.jpg', alt: 'Façade haussmannienne vue Tour Eiffel', order: 0, propertyId: apartment.id },
            { url: '/uploads/apt-paris-2.jpg', alt: 'Salon double avec parquet Versailles', order: 1, propertyId: apartment.id },
            { url: '/uploads/apt-paris-3.jpg', alt: 'Suite parentale avec dressing', order: 2, propertyId: apartment.id },
        ],
    });

    const chalet = await prisma.property.create({
        data: {
            slug: 'chalet-luxe-courchevel-1850',
            title: 'Chalet Grand Luxe — Courchevel 1850, Ski-in Ski-out',
            description: `Perché sur les hauteurs de Bellecôte à Courchevel 1850, ce chalet d'exception incarne la quintessence du luxe alpin. Avec ses 1 100 m² de surface habitable déployées sur cinq niveaux, il offre un espace de vie incomparable alliant les codes architecturaux de la montagne — bois de mélèze, pierre locale, ardoise — à un intérieur résolument contemporain.

L'accès aux pistes est direct depuis le chalet, rejoignant en quelques secondes le domaine skiable des 3 Vallées et ses 600 km de pistes. Le grand salon de 200 m² s'articule autour d'une spectaculaire cheminée en pierre de Bourgogne avec baies vitrées de sol en plafond sur les sommets enneigés.

Neuf suites avec salle de bains en marbre et dressing privatif. Espace bien-être exceptionnel : piscine intérieure 15m, hammam, sauna finlandais, jacuzzi extérieur, salle de massage. Salle de cinéma 12 places, cave à vins 800 bouteilles, garage 6 voitures.`,
            price: 18900000,
            surface: 1100,
            rooms: 16,
            bedrooms: 9,
            bathrooms: 8,
            type: 'CHALET',
            destination: 'alpes',
            city: 'Courchevel 1850',
            address: 'Bellecôte, Courchevel 1850',
            latitude: 45.4147,
            longitude: 6.6333,
            featured: true,
            published: true,
            badge: 'Coup de Cœur',
            dpe: 'B',
            reference: 'SRF-C18-001',
            amenities: JSON.stringify([
                'Ski-in / Ski-out direct',
                'Piscine intérieure 15m',
                'Spa & Hammam',
                'Sauna finlandais',
                'Jacuzzi extérieur',
                'Cinéma 12 places',
                'Cave à vins 800 bouteilles',
                'Salle de sport',
                'Garage 6 voitures',
                'Conciergerie 24h',
                'Cuisine Gaggenau professionnelle',
                'Domotique intégrale',
            ]),
            agentId: agentSM.id,
        },
    });
    await prisma.propertyImage.createMany({
        data: [
            { url: '/uploads/chalet-courchevel-1.jpg', alt: 'Chalet Courchevel 1850 façade neige', order: 0, propertyId: chalet.id },
            { url: '/uploads/chalet-courchevel-2.jpg', alt: 'Salon cheminée vue montagnes', order: 1, propertyId: chalet.id },
            { url: '/uploads/chalet-courchevel-3.jpg', alt: 'Piscine intérieure chauffée', order: 2, propertyId: chalet.id },
        ],
    });

    // 3 more properties for the listings page
    const penthouse = await prisma.property.create({
        data: {
            slug: 'penthouse-cannes-croisette',
            title: 'Penthouse Panoramique — La Croisette, Cannes',
            description: 'Exceptionnel penthouse de 340 m² en duplex sur la Croisette, avec terrasse de 120 m² et vue à 360° sur la baie de Cannes et les Îles de Lérins. Prestations 5 étoiles, piscine privée sur terrasse, accès sécurisé.',
            price: 8900000,
            surface: 340,
            rooms: 7,
            bedrooms: 4,
            bathrooms: 4,
            type: 'PENTHOUSE',
            destination: 'cote-dazur',
            city: 'Cannes',
            address: 'La Croisette, Cannes 06400',
            latitude: 43.5500,
            longitude: 7.0174,
            featured: false,
            published: true,
            badge: 'Croisette',
            dpe: 'B',
            reference: 'SRF-CN-001',
            amenities: JSON.stringify(['Terrasse 120 m²', 'Piscine privée sur terrasse', 'Vue Mer 360°', 'Parking VIP', 'Ascenseur privé', 'Gardien 24h']),
            agentId: agentEB.id,
        },
    });
    await prisma.propertyImage.createMany({
        data: [
            { url: '/uploads/penthouse-cannes-1.jpg', alt: 'Penthouse Croisette Cannes vue mer', order: 0, propertyId: penthouse.id },
        ],
    });

    const domaine = await prisma.property.create({
        data: {
            slug: 'domaine-saint-emilion-vignoble',
            title: 'Domaine Viticole — Saint-Émilion, Bordeaux',
            description: 'Château du 18ème siècle entouré de 28 hectares de vignes classées AOC Saint-Émilion Grand Cru. Logement principal de 800 m², 3 maisons de gardiens, chais et caves de vinification entièrement équipés. Investissement patrimonial d\'exception.',
            price: 9500000,
            surface: 800,
            rooms: 20,
            bedrooms: 12,
            bathrooms: 8,
            type: 'DOMAINE',
            destination: 'bordeaux',
            city: 'Saint-Émilion',
            address: 'Route des Côtes, Saint-Émilion 33330',
            latitude: 44.8944,
            longitude: -0.1556,
            featured: false,
            published: true,
            badge: 'Domaine',
            dpe: 'D',
            reference: 'SRF-SE-001',
            amenities: JSON.stringify(['28 ha de vignes AOC', 'Production annuelle 150 000 bouteilles', 'Château 18ème', '3 Maisons de gardiens', 'Chais de vinification', 'Cave de stockage 50 000 cols']),
            agentId: agentMH.id,
        },
    });
    await prisma.propertyImage.createMany({
        data: [
            { url: '/uploads/domaine-se-1.jpg', alt: 'Château Saint-Émilion vignobles au coucher du soleil', order: 0, propertyId: domaine.id },
        ],
    });

    const villaStTropez = await prisma.property.create({
        data: {
            slug: 'villa-saint-tropez-golfe',
            title: 'Villa d\'Architecte — Saint-Tropez, Vue Golfe',
            description: 'Villa d\'architecte contemporaine de 820 m² dominant le golfe de Saint-Tropez. Conçue par un cabinet international, cette propriété de prestige se caractérise par des lignes épurées, de grands volumes baignés de lumière et une piscine à débordement spectaculaire.',
            price: 14200000,
            surface: 820,
            rooms: 12,
            bedrooms: 8,
            bathrooms: 7,
            type: 'VILLA',
            destination: 'cote-dazur',
            city: 'Saint-Tropez',
            address: 'Les Parcs de Saint-Tropez, Var',
            latitude: 43.2677,
            longitude: 6.6408,
            featured: false,
            published: true,
            badge: 'Nouveau',
            dpe: 'B',
            reference: 'SRF-ST-001',
            amenities: JSON.stringify(['Vue golfe panoramique', 'Piscine à débordement', 'Home cinéma', 'Spa complet', 'Garage 4 voitures', 'Terrain 3 000 m²']),
            agentId: agentEB.id,
        },
    });
    await prisma.propertyImage.createMany({
        data: [
            { url: '/uploads/villa-st-1.jpg', alt: 'Villa architecte Saint-Tropez piscine golfe', order: 0, propertyId: villaStTropez.id },
        ],
    });

    console.log('✅ 6 properties created');
    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('Admin credentials:');
    console.log('  Email:    admin@sothebyrealty.fr');
    console.log('  Password: admin123');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
