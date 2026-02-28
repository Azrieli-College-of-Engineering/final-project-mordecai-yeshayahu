import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { setSession, clearSession } from '@/lib/auth';
import { faker } from '@faker-js/faker';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { email, password, firstName, lastName } = data;

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Check if user exists
        const existing = await db.users.findOne({ email });
        if (existing) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Create new user with fake data for required nested fields to match schema
        const newUser = {
            id: faker.string.uuid(),
            firstName,
            lastName,
            email,
            password,
            phone: faker.phone.number(),
            address: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                zip: faker.location.zipCode(),
                country: faker.location.country(),
            },
            job: 'Customer',
            avatar: faker.image.avatar(),
            registeredAt: new Date(),
        };

        const inserted = await db.users.insert(newUser);

        // Auto-login
        await setSession(inserted._id as string);

        const { password: _, ...userWithoutPassword } = inserted as any;
        return NextResponse.json({ success: true, user: userWithoutPassword });

    } catch (error) {
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}

export async function DELETE() {
    await clearSession();
    return NextResponse.json({ success: true });
}
