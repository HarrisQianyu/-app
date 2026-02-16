'use client';

import Image from 'next/image';
import { Product, platformConfig } from '@/lib/mockData';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const platform = platformConfig[product.platform];
    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-300 animate-scale-in">
            {/* 商品图片 */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* 相似度标签 */}
                <div className="absolute top-2 left-2 bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {product.similarityScore}% 匹配
                </div>

                {/* 折扣标签 */}
                {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{discount}%
                    </div>
                )}
            </div>

            {/* 商品信息 */}
            <div className="p-4">
                {/* 平台标识 */}
                <div className="flex items-center justify-between mb-2">
                    <div
                        className="flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-semibold"
                        style={{ backgroundColor: `${platform.color}20`, color: platform.color }}
                    >
                        <span>{platform.icon}</span>
                        <span>{platform.name}</span>
                    </div>

                    {/* 店铺评分 */}
                    {product.shopRating && (
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span>{product.shopRating}</span>
                        </div>
                    )}
                </div>

                {/* 商品标题 */}
                <h3 className="text-sm text-gray-800 line-clamp-2 mb-3 min-h-[40px] group-hover:text-primary-600 transition-colors">
                    {product.title}
                </h3>

                {/* 价格信息 */}
                <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-2xl font-bold text-red-500">
                        ¥{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ¥{product.originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>

                {/* 销量和店铺 */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>月销 {product.sales.toLocaleString()}</span>
                    <span className="truncate max-w-[120px]">{product.shopName}</span>
                </div>

                {/* 操作按钮 */}
                <button
                    onClick={() => window.open(product.productUrl, '_blank')}
                    className="w-full bg-gradient-primary text-white py-2 rounded-lg font-semibold
                     hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200
                     active:translate-y-0"
                >
                    查看详情
                </button>
            </div>
        </div>
    );
}
