'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/dashboard');
                router.refresh();
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container flex items-center justify-center min-h-screen py-20">
            <div className="glass-panel p-xl w-full" style={{ maxWidth: '450px' }}>
                <div className="text-center mb-10">
                    <h1 className="text-xl font-bold">Create Account</h1>
                    <p className="text-secondary mt-2">Join the Aura community</p>
                </div>

                {error && (
                    <div className="bg-pink-500/20 text-pink-400 p-sm rounded-md mb-6 text-sm border border-pink-500/30 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="flex-col gap-md">
                    <div className="grid grid-cols-2 gap-md">
                        <div className="flex-col gap-xs">
                            <label className="text-sm font-medium text-secondary">First Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex-col gap-xs">
                            <label className="text-sm font-medium text-secondary">Last Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex-col gap-xs">
                        <label className="text-sm font-medium text-secondary">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex-col gap-xs">
                        <label className="text-sm font-medium text-secondary">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary mt-4" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="text-center mt-8 text-secondary text-sm">
                    Already have an account? <Link href="/login" className="text-primary hover:text-indigo-400 transition-fast">Sign in here</Link>
                </p>
            </div>
        </main>
    );
}
