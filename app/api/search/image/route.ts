import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

/**
 * 以图搜图接口
 * POST /api/search/image
 * 
 * @description 根据上传的图片搜索全网电商平台的相似商品
 * @author FuYu Team
 * @date 2026-02-16
 */

// 请求参数验证 Schema
const searchSchema = z.object({
    imageUrl: z.string().url('图片URL格式不正确'),
    userId: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        // 1. 解析请求体
        const body = await request.json();

        // 2. 参数验证
        const validationResult = searchSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    code: 400,
                    message: '参数验证失败',
                    data: null,
                    errors: validationResult.error.errors,
                },
                { status: 400 }
            );
        }

        const { imageUrl, userId } = validationResult.data;

        // 3. TODO: 调用电商平台 API
        // 这里应该调用淘宝、京东、拼多多等平台的以图搜图 API
        // 当前返回 Mock 数据作为演示

        const mockResults = [
            {
                platform: 'taobao',
                productId: 'tb_' + Date.now(),
                title: '【淘宝】时尚休闲运动鞋 透气舒适跑步鞋',
                price: 299.00,
                originalPrice: 599.00,
                imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                productUrl: 'https://taobao.com/item/123456',
                sales: 15234,
                shopName: '官方旗舰店',
                shopRating: 4.9,
                similarityScore: 95,
            },
            {
                platform: 'jd',
                productId: 'jd_' + Date.now(),
                title: '【京东】运动休闲鞋男女同款 轻便透气',
                price: 279.00,
                originalPrice: 499.00,
                imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
                productUrl: 'https://jd.com/item/789012',
                sales: 8932,
                shopName: '京东自营',
                shopRating: 4.8,
                similarityScore: 92,
            },
            {
                platform: 'pdd',
                productId: 'pdd_' + Date.now(),
                title: '【拼多多】百亿补贴 运动鞋休闲鞋跑步鞋',
                price: 189.00,
                originalPrice: 399.00,
                imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
                productUrl: 'https://pinduoduo.com/item/345678',
                sales: 23456,
                shopName: '品牌直营店',
                shopRating: 4.7,
                similarityScore: 88,
            },
        ];

        // 4. 如果用户已登录，保存搜索历史
        if (userId) {
            try {
                if (prisma) {
                    const imageHash = Buffer.from(imageUrl).toString('base64').substring(0, 32);

                    const history = await prisma.searchHistory.create({
                        data: {
                            userId,
                            imageUrl,
                            imageHash,
                            resultCount: mockResults.length,
                            searchParams: {
                                platforms: ['taobao', 'jd', 'pdd'],
                                timestamp: new Date().toISOString(),
                            },
                        },
                    });

                    // 保存搜索结果
                    await prisma.searchResult.createMany({
                        data: mockResults.map(result => ({
                            historyId: history.id,
                            platform: result.platform,
                            productId: result.productId,
                            title: result.title,
                            price: result.price,
                            originalPrice: result.originalPrice || result.price,
                            imageUrl: result.imageUrl,
                            productUrl: result.productUrl,
                            sales: result.sales,
                            shopName: result.shopName,
                            shopRating: result.shopRating,
                            similarityScore: result.similarityScore,
                        })),
                    });
                }
            } catch (dbError) {
                console.error('Save history error:', dbError);
                // 即使保存历史失败，也返回搜索结果
            }
        }

        // 5. 返回搜索结果
        return NextResponse.json(
            {
                code: 200,
                message: '搜索成功',
                data: {
                    results: mockResults,
                    total: mockResults.length,
                    platforms: ['taobao', 'jd', 'pdd'],
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            {
                code: 500,
                message: '搜索失败',
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
