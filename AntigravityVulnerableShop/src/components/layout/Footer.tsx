import Link from 'next/link';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';
import './footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid grid">
                    <div className="footer-brand flex-col gap-sm">
                        <Link href="/" className="logo flex items-center gap-sm">
                            <div className="logo-icon bg-gradient"></div>
                            <span className="text-gradient">Aura</span>
                        </Link>
                        <p className="footer-desc">
                            Aura brings you the finest selection of modern apparel, designed for comfort and crafted with precision.
                        </p>
                        <div className="social-links flex gap-sm">
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Github"><Github size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links flex-col gap-sm">
                        <h3>Shop</h3>
                        <Link href="/shop?category=Shirts">Shirts</Link>
                        <Link href="/shop?category=Pants">Pants</Link>
                        <Link href="/shop?category=Jackets">Jackets</Link>
                        <Link href="/shop?category=Accessories">Accessories</Link>
                    </div>

                    <div className="footer-links flex-col gap-sm">
                        <h3>Support</h3>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/shipping">Shipping & Returns</Link>
                        <Link href="/contact">Contact Us</Link>
                        <Link href="/size-guide">Size Guide</Link>
                    </div>

                    <div className="footer-newsletter flex-col gap-sm">
                        <h3>Stay in the loop</h3>
                        <p className="footer-desc">Subscribe for the latest releases.</p>
                        <form className="newsletter-form flex gap-xs">
                            <input type="email" placeholder="Email address" className="input-field" required />
                            <button type="submit" className="btn-primary">Join</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom flex justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} Aura Clothing. All rights reserved.</p>
                    <div className="footer-legal flex gap-md">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
