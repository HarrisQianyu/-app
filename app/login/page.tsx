'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useStore();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('请填写所有字段');
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError('两次密码输入不一致');
            return;
        }

        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                router.push('/');
            } else {
                setError('登录失败，请检查邮箱和密码');
            }
        } catch (err) {
            setError('登录过程中出现错误');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8 animate-fade-in">
                    <Link href="/" className="inline-flex items-center space-x-2 group">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                            <span className="text-4xl">🎯</span>
                        </div>
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        比价猎手
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {isLogin ? '欢迎回来！' : '创建您的账户'}
                    </p>
                </div>

                {/* 登录/注册表单 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
                    {/* 切换标签 */}
                    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 rounded-md font-medium transition-all duration-200 ${isLogin
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            登录
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 rounded-md font-medium transition-all duration-200 ${!isLogin
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            注册
                        </button>
                    </div>

                    {/* 表单 */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* 邮箱 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                邮箱地址
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* 密码 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                密码
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* 确认密码（仅注册时显示） */}
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    确认密码
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        )}

                        {/* 错误提示 */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* 提交按钮 */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                w-full py-3 rounded-lg font-semibold text-white
                transition-all duration-300 transform
                ${loading
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-gradient-primary hover:shadow-lg hover:-translate-y-0.5'
                                }
              `}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>处理中...</span>
                                </div>
                            ) : (
                                isLogin ? '登录' : '注册'
                            )}
                        </button>
                    </form>

                    {/* 忘记密码 */}
                    {isLogin && (
                        <div className="mt-4 text-center">
                            <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                                忘记密码？
                            </a>
                        </div>
                    )}

                    {/* 演示提示 */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 text-center">
                            💡 演示模式：输入任意邮箱和密码即可登录
                        </p>
                    </div>
                </div>

                {/* 返回首页 */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                        ← 返回首页
                    </Link>
                </div>
            </div>
        </div>
    );
}
