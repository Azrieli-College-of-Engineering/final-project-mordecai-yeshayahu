import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');

    let query = {};
    if (search) {
        query = { name: { $regex: new RegExp(search, 'i') } };
    }

    try {
        const products = await db.products.find(query).sort({ rating: -1 });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
