import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import './product-card.css';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    rating: number;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="product-card glass-panel">
            <Link href={`/product/${product.id}`} className="product-image-wrapper">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={500}
                    className="product-image"
                    unoptimized // Using Unsplash images directly
                />
                <div className="product-overlay">
                    <button className="btn-primary product-quick-add">
                        Quick Add <ShoppingCart size={16} />
                    </button>
                </div>
            </Link>

            <div className="product-info flex-col gap-xs">
                <div className="product-meta flex justify-between items-center">
                    <span className="product-brand">{product.brand}</span>
                    <div className="product-rating flex items-center gap-xs">
                        <Star size={14} className="star-icon" fill="currentColor" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                <Link href={`/product/${product.id}`} className="product-title">
                    {product.name}
                </Link>

                <div className="product-price">
                    ${product.price.toFixed(2)}
                </div>
            </div>
        </div>
    );
}
