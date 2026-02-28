import { db } from '@/lib/db';
import Image from 'next/image';
import { Metadata } from 'next';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Dashboard | Aura Premium Clothing',
    description: 'Manage your profile, orders, and browse the user directory.',
};

export const dynamic = 'force-dynamic';

interface User {
    _id: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    job: string;
    avatar: string;
    registeredAt: Date;
}

export default async function DashboardPage() {
    const sessionId = await getSession();

    if (!sessionId) {
        redirect('/login');
    }

    // Mock login: Fetch the first user since we don't have a real active session mechanism built-in requested
    // In a real app we'd use cookies/session token to get the logged-in user.
    const user = await db.users.findOne({ _id: sessionId }) as unknown as User;

    if (!user) {
        redirect('/login');
    }

    const allUsers = await db.users.find({}).sort({ firstName: 1 }).limit(10) as unknown as User[]; // Display 10 of the 50 full fake users

    if (!user) {
        return <div className="container py-20 min-h-screen">Loading user data...</div>;
    }

    return (
        <main className="container py-20 min-h-screen">
            <div className="grid" style={{ gridTemplateColumns: '1fr 3fr', gap: 'var(--spacing-2xl)' }}>

                {/* Sidebar */}
                <aside className="glass-panel p-xl flex-col gap-lg align-center text-center h-fit" style={{ height: 'fit-content' }}>
                    <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/30 mb-4">
                        <Image src={user.avatar} alt={user.firstName} fill className="object-cover" unoptimized />
                    </div>
                    <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                    <p className="text-secondary">{user.job}</p>
                    <div className="w-full bg-border-color h-px my-4" style={{ height: '1px', background: 'var(--border-color)' }}></div>
                    <div className="flex-col gap-sm w-full text-left">
                        <button className="btn-secondary w-full justify-start">My Profile</button>
                        <button className="btn-secondary w-full justify-start" style={{ background: 'transparent', borderColor: 'transparent' }}>Orders</button>
                        <button className="btn-secondary w-full justify-start" style={{ background: 'transparent', borderColor: 'transparent' }}>Wishlist</button>
                        <button className="btn-secondary w-full justify-start text-pink-400" style={{ background: 'transparent', borderColor: 'transparent', marginTop: 'auto' }}>Sign Out</button>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-col gap-xl">
                    <section className="glass-panel p-xl">
                        <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                        <div className="grid sm:grid-cols-2 gap-lg">
                            <div className="flex-col gap-xs">
                                <span className="text-sm text-secondary">Email</span>
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <div className="flex-col gap-xs">
                                <span className="text-sm text-secondary">Phone</span>
                                <span className="font-medium">{user.phone}</span>
                            </div>
                            <div className="flex-col gap-xs sm:col-span-2">
                                <span className="text-sm text-secondary">Shipping Address</span>
                                <span className="font-medium">
                                    {user.address.street}, {user.address.city}, {user.address.state} {user.address.zip}, {user.address.country}
                                </span>
                            </div>
                            <div className="flex-col gap-xs">
                                <span className="text-sm text-secondary">Member Since</span>
                                <span className="font-medium">{new Date(user.registeredAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button className="btn-primary">Edit Details</button>
                        </div>
                    </section>

                    <section className="glass-panel p-xl">
                        <h2 className="text-xl font-bold mb-6">Other Users directory</h2>
                        <p className="text-secondary mb-6">Showing a sample of fake generated users in the database.</p>
                        <div className="flex-col gap-md">
                            {allUsers.map((u: any) => (
                                <div key={u.id} className="flex justify-between items-center p-md bg-white/5 rounded-lg border border-white/10" style={{ padding: 'var(--spacing-md)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                                    <div className="flex items-center gap-md">
                                        <div className="w-10 h-10 rounded-full overflow-hidden relative border border-indigo-500/20">
                                            <Image src={u.avatar} alt={u.firstName} fill className="object-cover" unoptimized />
                                        </div>
                                        <div>
                                            <div className="font-bold">{u.firstName} {u.lastName}</div>
                                            <div className="text-xs text-secondary">{u.job}</div>
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm-flex flex-col">
                                        <span className="text-sm">{u.email}</span>
                                        <span className="text-xs text-secondary">{u.address.country}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </main>
    );
}
