import ProductCard from '@/components/product/ProductCard';
import { db } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch some featured products
  const featuredProducts = await db.products.find({}).sort({ rating: -1 }).limit(4);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section flex flex-col items-center justify-center text-center px-4" style={{ minHeight: '90vh', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 to-transparent z-0"></div>

        <div className="z-10 animate-fade-in flex-col items-center gap-lg mt-20" style={{ maxWidth: '800px' }}>
          <div className="inline-block px-5 py-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-md">
            New Fall Collection 2026
          </div>

          <h1 className="text-gradient leading-tight" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}>
            Elevate Your Style.
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
            Discover our curated collection of premium clothing, blending comfort, durability, and unmatched modern aesthetics.
          </p>

          <div className="flex gap-md justify-center mt-8">
            <Link href="/shop" className="btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '1.1rem' }}>
              Shop Collection
            </Link>
          </div>
        </div>

        {/* Abstract decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl z-0 animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl z-0"></div>
      </section>

      {/* Featured Products */}
      <section className="container py-20 mt-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>Featured Pieces</h2>
            <p className="text-secondary" style={{ fontSize: '1.1rem' }}>Handpicked selections for the season.</p>
          </div>
          <Link href="/shop" className="btn-secondary hidden sm-flex">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-xl">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Values */}
      <section className="bg-secondary py-20 border-t border-color">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-xl text-center">
          <div className="glass-panel p-xl flex-col items-center gap-md">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <h3 className="text-xl font-bold">Premium Quality</h3>
            <p className="text-secondary">Crafted with the finest materials for lasting comfort and durability.</p>
          </div>
          <div className="glass-panel p-xl flex-col items-center gap-md">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <h3 className="text-xl font-bold">Ethical Sourcing</h3>
            <p className="text-secondary">We ensure fair trade practices and sustainable manufacturing processes.</p>
          </div>
          <div className="glass-panel p-xl flex-col items-center gap-md">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 12l-4 4-4-4M12 8v8" /></svg>
            </div>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-secondary">Free worldwide shipping on all orders over $150.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
