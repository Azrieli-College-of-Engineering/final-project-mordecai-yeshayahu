import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'aura_session';

export async function setSession(userId: string) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, userId, {
        httpOnly: true,
        secure: false, // Set to false to allow login over HTTP on local network
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}
