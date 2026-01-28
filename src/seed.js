const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Deal = require('./models/Deal');

// Load environment variables
dotenv.config();

const sampleDeals = [
    {
        title: 'AWS Activate Credits',
        description: 'Get up to $100,000 in AWS credits for your startup. Valid for cloud infrastructure, compute, storage, and database services.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
        category: 'Cloud',
        discountCode: 'AWS-STARTUP-2024',
        link: 'https://aws.amazon.com/activate/',
        isLocked: false,
        eligibility: 'Early-stage startups with less than $10M funding',
    },
    {
        title: 'Notion for Startups',
        description: 'Free Notion Plus plan for up to 6 months. Collaborate with your team using powerful docs, wikis, and project management.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
        category: 'Productivity',
        discountCode: 'NOTION-FREE-6M',
        link: 'https://www.notion.so/startups',
        isLocked: false,
        eligibility: 'All registered startups',
    },
    {
        title: 'HubSpot for Startups',
        description: '90% off HubSpot CRM suite for the first year. Includes Marketing Hub, Sales Hub, and Service Hub.',
        logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
        category: 'Marketing',
        discountCode: 'HUBSPOT-90OFF',
        link: 'https://www.hubspot.com/startups',
        isLocked: true, // Locked deal
        eligibility: 'Startups with seed funding or accelerator backing',
    },
    {
        title: 'Stripe Atlas',
        description: '$500 in Stripe processing credits. Plus, waived Atlas fees for company incorporation.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
        category: 'Finance',
        discountCode: 'STRIPE-ATLAS-500',
        link: 'https://stripe.com/atlas',
        isLocked: false,
        eligibility: 'New startups incorporating through Atlas',
    },
    {
        title: 'Google Cloud Credits',
        description: '$200,000 in Google Cloud credits over 2 years. Access to GCP services including Compute Engine, BigQuery, and AI/ML tools.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
        category: 'Cloud',
        discountCode: 'GCP-STARTUP-200K',
        link: 'https://cloud.google.com/startup',
        isLocked: true, // Locked deal
        eligibility: 'VC-backed startups with Series A or above',
    },
    {
        title: 'Figma for Startups',
        description: 'Free Figma Organization plan for 2 years. Design, prototype, and collaborate with your team.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
        category: 'DevTools',
        discountCode: 'FIGMA-ORG-FREE',
        link: 'https://www.figma.com/startups/',
        isLocked: false,
        eligibility: 'Startups with less than 50 employees',
    },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding...');

        // Clear existing deals
        await Deal.deleteMany({});
        console.log('Cleared existing deals');

        // Insert sample deals
        const insertedDeals = await Deal.insertMany(sampleDeals);
        console.log(`Inserted ${insertedDeals.length} sample deals`);

        // Log the inserted deals
        insertedDeals.forEach((deal) => {
            console.log(`  - ${deal.title} (${deal.isLocked ? 'LOCKED' : 'PUBLIC'})`);
        });

        console.log('\nSeeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('MongoDB Disconnected');
    }
};

seedDatabase();
