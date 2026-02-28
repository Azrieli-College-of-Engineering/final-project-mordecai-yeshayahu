'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import './navbar.css';

export default function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/register', { method: 'DELETE' }); // The DELETE method clears the session
        router.push('/login');
        router.refresh();
    };

    return (
        <nav className="navbar glass-panel">
            <div className="container flex items-center justify-between h-full">
                <Link href="/" className="logo flex items-center gap-sm">
                    <div className="logo-icon bg-gradient"></div>
                    <span className="text-gradient">Aura</span>
                </Link>

                <div className="nav-links hidden md-flex">
                    <Link href="/shop" className="nav-item">Shop</Link>
                    <Link href="/collections" className="nav-item">Collections</Link>
                    <Link href="/about" className="nav-item">About</Link>
                </div>

                <div className="nav-actions flex items-center gap-md">
                    <button className="icon-btn" aria-label="Search">
                        <Search size={20} />
                    </button>
                    <Link href="/dashboard" className="icon-btn" aria-label="User Dashboard">
                        <User size={20} />
                    </Link>
                    <button onClick={handleLogout} className="icon-btn" aria-label="Logout" title="Logout">
                        <LogOut size={20} />
                    </button>
                    <button className="icon-btn flex items-center gap-xs" aria-label="Cart">
                        <ShoppingBag size={20} />
                        <span className="cart-badge">0</span>
                    </button>
                    <button className="icon-btn hidden-md" aria-label="Menu">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
