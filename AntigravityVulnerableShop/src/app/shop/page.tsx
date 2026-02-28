import ProductCard from '@/components/product/ProductCard';
import { db } from '@/lib/db';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shop | Aura Premium Clothing',
    description: 'Browse our extensive catalog of premium shirts, pants, jackets, shoes, and accessories.',
};

export const dynamic = 'force-dynamic';

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams;
    const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
    const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;

    let query: any = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: new RegExp(search, 'i') };

    const products = await db.products.find(query).sort({ createdAt: -1 });

    return (
        <main className="container py-20 min-h-screen">
            <div className="flex-col gap-xl">
                <header className="flex-col gap-sm">
                    <h1 className="text-gradient text-xl" style={{ fontSize: '3rem' }}>
                        {category ? `${category} Collection` : 'All Products'}
                    </h1>
                    <p className="text-secondary">
                        {products.length} {products.length === 1 ? 'product' : 'products'} found
                        {search && ` for "${search}"`}
                    </p>
                </header>

                <div className="flex gap-xl align-start" style={{ alignItems: 'flex-start' }}>
                    {/* Sidebar Filters */}
                    <aside className="hidden md-flex flex-col gap-lg glass-panel p-xl" style={{ width: '250px', flexShrink: 0 }}>
                        <div className="flex-col gap-sm">
                            <h3 className="font-bold">Categories</h3>
                            <div className="flex-col gap-xs">
                                <a href="/shop" className={!category ? 'text-indigo-400 font-medium' : 'text-secondary hover:text-primary'}>All</a>
                                <a href="/shop?category=Shirts" className={category === 'Shirts' ? 'text-indigo-400 font-medium' : 'text-secondary hover:text-primary'}>Shirts</a>
                                <a href="/shop?category=Pants" className={category === 'Pants' ? 'text-indigo-400 font-medium' : 'text-secondary hover:text-primary'}>Pants</a>
                                <a href="/shop?category=Jackets" className={category === 'Jackets' ? 'text-indigo-400 font-medium' : 'text-secondary hover:text-primary'}>Jackets</a>
                                <a href="/shop?category=Accessories" className={category === 'Accessories' ? 'text-indigo-400 font-medium' : 'text-secondary hover:text-primary'}>Accessories</a>
                                <a href="/shop?category=Shoes" className={category === 'Shoes' ? 'text-indigo-400 font-medium' : 'text-secondary hover:text-primary'}>Shoes</a>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
                                {products.map((product: any) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="glass-panel p-xl text-center py-20">
                                <h3 className="text-xl font-bold mb-6">No products found</h3>
                                <p className="text-secondary mb-6">Try adjusting your filters or search query.</p>
                                <a href="/shop" className="btn-primary">Clear Filters</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
