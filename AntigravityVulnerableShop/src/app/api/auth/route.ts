import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { setSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const user = await db.users.findOne({ email, password });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Set HTTP-only cookie session
        await setSession(user._id as string);

        // Return user without password
        const { password: _, ...userWithoutPassword } = user as any;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword
        });
    } catch (error) {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}
