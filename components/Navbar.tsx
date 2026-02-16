'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function Navbar() {
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useStore();

    const navItems = [
        { name: '首页', path: '/' },
        { name: '搜索历史', path: '/history' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            富鱼比价
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${pathname === item.path
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                                    }
                `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated && user ? (
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    {user.avatar && (
                                        <img
                                            src={user.avatar}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full border-2 border-primary-300"
                                        />
                                    )}
                                    <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                        {user.username}
                                    </span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                                >
                                    退出
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-6 py-2 bg-gradient-primary text-white rounded-lg font-medium
                           hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                登录
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
