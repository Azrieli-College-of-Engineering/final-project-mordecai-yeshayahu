'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Force refresh to update server components (like layout/navbar)
                router.push('/dashboard');
                router.refresh();
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container flex items-center justify-center min-h-screen py-20">
            <div className="glass-panel p-xl w-full" style={{ maxWidth: '400px' }}>
                <div className="text-center mb-10">
                    <div className="logo-icon bg-gradient mx-auto mb-4" style={{ width: '48px', height: '48px' }}></div>
                    <h1 className="text-xl font-bold">Welcome Back</h1>
                    <p className="text-secondary mt-2">Sign in to your Aura account</p>
                </div>

                {error && (
                    <div className="bg-pink-500/20 text-pink-400 p-sm rounded-md mb-6 text-sm border border-pink-500/30 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex-col gap-md">
                    <div className="flex-col gap-xs">
                        <label className="text-sm font-medium text-secondary">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex-col gap-xs">
                        <label className="text-sm font-medium text-secondary">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary mt-4" disabled={loading}>
                        {loading ? 'Signing in...' : (
                            <>Sign In <LogIn size={18} /></>
                        )}
                    </button>
                </form>

                <p className="text-center mt-8 text-secondary text-sm">
                    Don't have an account? <Link href="/register" className="text-primary hover:text-indigo-400 transition-fast">Register here</Link>
                </p>

                <div className="mt-8 pt-6 border-t border-color text-center text-xs text-secondary">
                    <p>REACT2SHELL DEMONSTARTION --- MORDECAI YESHAYAHU</p>
                </div>
            </div>
        </main>
    );
}
