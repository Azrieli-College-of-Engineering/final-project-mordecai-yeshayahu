import { faker } from '@faker-js/faker';
import { db } from './db';

const CLOTHING_CATEGORIES = ['Shirts', 'Pants', 'Jackets', 'Accessories', 'Shoes'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export async function seedDatabase() {
    // Check if users exist
    const countUsers = await db.users.count({});
    if (countUsers === 0) {
        console.log('Seeding fake users...');
        const users = Array.from({ length: 50 }).map(() => ({
            id: faker.string.uuid(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            password: 'password123', // Static password for mock login
            address: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                zip: faker.location.zipCode(),
                country: faker.location.country(),
            },
            job: faker.person.jobTitle(),
            avatar: faker.image.avatar(),
            registeredAt: faker.date.past(),
        }));

        await db.users.insert(users);
        console.log(`Inserted ${users.length} users.`);
    }

    // Check if products exist
    const countProducts = await db.products.count({});
    if (countProducts === 0) {
        console.log('Seeding fake products...');
        const products = Array.from({ length: 24 }).map(() => {
            const category = faker.helpers.arrayElement(CLOTHING_CATEGORIES);
            const name = `${faker.commerce.productAdjective()} ${category}`;
            // Unsplash Source API is deprecated, using Picsum for reliable high-quality placeholders
            const imageId = faker.number.int({ min: 1, max: 1000 });
            const imageUrl = `https://picsum.photos/id/${imageId}/600/800`;

            return {
                id: faker.string.uuid(),
                name,
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price({ min: 10, max: 300 })),
                category,
                brand: faker.company.name(),
                image: imageUrl,
                sizes: faker.helpers.arrayElements(SIZES, { min: 2, max: 5 }),
                inStock: faker.datatype.boolean(),
                rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }),
                createdAt: faker.date.recent(),
            };
        });

        await db.products.insert(products);
        console.log(`Inserted ${products.length} products.`);
    }
}
