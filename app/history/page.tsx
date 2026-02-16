'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { useStore } from '@/lib/store';
import { mockSearchHistory } from '@/lib/mockData';

export default function HistoryPage() {
    const { searchHistory, clearSearchHistory } = useStore();
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    // 使用 mock 数据或实际数据
    const displayHistory = searchHistory.length > 0 ? searchHistory : mockSearchHistory;

    const handleClearHistory = () => {
        clearSearchHistory();
        setShowClearConfirm(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 页面标题 */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">搜索历史</h1>
                        <p className="text-gray-600">
                            共 {displayHistory.length} 条记录
                        </p>
                    </div>

                    {displayHistory.length > 0 && (
                        <button
                            onClick={() => setShowClearConfirm(true)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                        >
                            清空历史
                        </button>
                    )}
                </div>

                {/* 历史记录列表 */}
                {displayHistory.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayHistory.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                            >
                                {/* 图片 */}
                                <div className="relative h-48 bg-gray-100 overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt="搜索图片"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />

                                    {/* 结果数量标签 */}
                                    <div className="absolute top-3 right-3 bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        {item.resultCount} 个结果
                                    </div>
                                </div>

                                {/* 信息 */}
                                <div className="p-4">
                                    {/* 时间 */}
                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {item.searchTime}
                                    </div>

                                    {/* 平台标签 */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.platforms.map((platform) => (
                                            <span
                                                key={platform}
                                                className="px-2 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-md"
                                            >
                                                {platform}
                                            </span>
                                        ))}
                                    </div>

                                    {/* 操作按钮 */}
                                    <button
                                        className="w-full py-2 bg-gradient-primary text-white rounded-lg font-medium
                               hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        查看结果
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* 空状态 */
                    <div className="text-center py-20">
                        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">暂无搜索历史</h3>
                        <p className="text-gray-500 mb-6">开始您的第一次搜索吧！</p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium
                         hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            开始搜索
                        </a>
                    </div>
                )}

                {/* 清空确认对话框 */}
                {showClearConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">确认清空历史？</h3>
                            <p className="text-gray-600 mb-6">
                                此操作将删除所有搜索历史记录，且无法恢复。
                            </p>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    取消
                                </button>
                                <button
                                    onClick={handleClearHistory}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                                >
                                    确认清空
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
