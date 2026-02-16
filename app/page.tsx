'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ImageUploader from '@/components/ImageUploader';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/lib/store';
import { mockProducts } from '@/lib/mockData';
import Image from 'next/image';

export default function Home() {
    const {
        uploadedImage,
        setUploadedImage,
        searchResults,
        setSearchResults,
        isSearching,
        setIsSearching,
        addSearchHistory,
    } = useStore();

    const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'similarity'>('similarity');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);

    // 全网搜索
    const handleSearch = async () => {
        if (!uploadedImage) return;

        setIsSearching(true);

        // 模拟 API 调用延迟
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 全网搜索，返回所有结果
        setSearchResults(mockProducts);
        setIsSearching(false);

        // 添加到搜索历史
        addSearchHistory({
            id: Date.now().toString(),
            imageUrl: uploadedImage,
            searchTime: new Date().toLocaleString('zh-CN'),
            resultCount: mockProducts.length,
            platforms: ['全网'],
        });
    };

    // 排序结果
    const sortedResults = [...searchResults].sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return b.similarityScore - a.similarityScore;
    }).filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 重置搜索
    const handleReset = () => {
        setUploadedImage(null);
        setSearchResults([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 搜索区域 */}
                {!searchResults.length ? (
                    <div className="max-w-3xl mx-auto">
                        {/* 标题 */}
                        <div className="text-center mb-12 animate-fade-in">
                            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-pink-600 bg-clip-text text-transparent">
                                富鱼比价
                            </h1>
                            <p className="text-xl text-gray-600">
                                全网比价，让购物更省心 🐟💰
                            </p>
                        </div>

                        {/* 上传区域 */}
                        {!uploadedImage ? (
                            <div className="animate-slide-up">
                                <ImageUploader />
                            </div>
                        ) : (
                            <div className="animate-scale-in">
                                {/* 图片预览 */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800">已上传的图片</h3>
                                        <button
                                            onClick={handleReset}
                                            className="text-sm text-red-500 hover:text-red-700 font-medium"
                                        >
                                            重新上传
                                        </button>
                                    </div>
                                    <div className="relative w-full h-64 rounded-xl overflow-hidden">
                                        <Image
                                            src={uploadedImage}
                                            alt="Uploaded"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* 搜索按钮 */}
                                <button
                                    onClick={handleSearch}
                                    disabled={isSearching}
                                    className={`
                    w-full py-4 rounded-xl font-bold text-lg text-white
                    transition-all duration-300 transform
                    ${isSearching
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-gradient-primary hover:shadow-2xl hover:-translate-y-1'
                                        }
                  `}
                                >
                                    {isSearching ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>全网搜索中...</span>
                                        </div>
                                    ) : (
                                        '开始全网比价'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* 搜索结果 */
                    <div className="animate-fade-in">
                        {/* 结果头部 */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        找到 {sortedResults.length} 个相似商品
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        全网比价结果
                                    </p>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="px-6 py-2 bg-gradient-primary text-white rounded-lg font-medium
                             hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    重新搜索
                                </button>
                            </div>

                            {/* 筛选和排序 */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                {/* 排序 */}
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">排序方式</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as any)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="similarity">相似度优先</option>
                                        <option value="price-asc">价格从低到高</option>
                                        <option value="price-desc">价格从高到低</option>
                                    </select>
                                </div>

                                {/* 价格筛选 */}
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        价格区间：¥{priceRange[0]} - ¥{priceRange[1]}
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="20000"
                                            step="100"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 商品列表 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sortedResults.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {sortedResults.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">没有符合条件的商品</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
