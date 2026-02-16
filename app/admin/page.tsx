'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const { user, isAuthenticated } = useStore();
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 简单的前端保护
        // if (!isAuthenticated) {
        //   router.push('/login');
        //   return;
        // }

        // 获取数据
        fetchStats();
    }, [isAuthenticated, router]);

    const fetchStats = async () => {
        try {
            // 在实际应用中，这里应该带上 token
            const res = await fetch('/api/admin/stats');
            const data = await res.json();
            if (data.code === 200) {
                setStats(data.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">🛠️ 系统管理后台</h1>
                    <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm">
                        状态: <span className="text-green-600 font-semibold">运行中</span>
                    </div>
                </div>

                {/* 数据概览卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">总用户数</div>
                        <div className="text-3xl font-bold text-blue-600">
                            {stats?.stats?.totalUsers || 0}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">总搜索次数</div>
                        <div className="text-3xl font-bold text-green-600">
                            {stats?.stats?.totalSearches || 0}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">商品数据量</div>
                        <div className="text-3xl font-bold text-purple-600">
                            {stats?.stats?.totalResults || 0}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">API调用次数</div>
                        <div className="text-3xl font-bold text-orange-600">
                            {stats?.stats?.totalApiCalls || 0}
                        </div>
                    </div>
                </div>

                {/* 数据库内容预览 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">最新注册用户 (数据库预览)</h2>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">内置数据库连接</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {stats?.recentUsers?.length > 0 ? (
                                    stats.recentUsers.map((u: any) => (
                                        <tr key={u.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-500 font-mono">{u.id.substring(0, 8)}...</td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.username}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {u.role || 'user'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            暂无数据，请尝试注册一个新用户...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                        💡 提示：这里展示的是真实存储在 Vercel Postgres 数据库中的数据。
                    </div>
                </div>
            </main>
        </div>
    );
}
