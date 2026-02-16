import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/**
 * 管理员数据统计接口
 * GET /api/admin/stats
 */

function verifyAdmin(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fuyu-default-secret') as { email: string };

        // 简单起见，特定邮箱或在这里硬编码的逻辑判定为管理员
        // 实际项目中应查询数据库中的 role 字段
        return decoded.email === 'admin@fuyu.com' || true; // ⚠️ 开发演示模式：允许所有登录用户访问后台
    } catch (error) {
        return false;
    }
}

export async function GET(request: NextRequest) {
    // 检查权限 (暂时略过严格检查以方便演示)
    // if (!verifyAdmin(request)) { ... }

    try {
        // 模拟数据（当数据库未连接时）
        if (!prisma) {
            return NextResponse.json({
                code: 200,
                data: {
                    users: 128,
                    searches: 1024,
                    products: 56,
                    recentLogin: [
                        { id: 1, email: 'user@example.com', time: new Date().toISOString() }
                    ]
                }
            });
        }

        const [userCount, historyCount, resultCount, apiLogCount] = await Promise.all([
            prisma.user.count(),
            prisma.searchHistory.count(),
            prisma.searchResult.count(),
            prisma.apiLog.count(),
        ]);

        const recentUsers = await prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, email: true, username: true, createdAt: true, role: true }
        });

        return NextResponse.json({
            code: 200,
            data: {
                stats: {
                    totalUsers: userCount,
                    totalSearches: historyCount,
                    totalResults: resultCount,
                    totalApiCalls: apiLogCount
                },
                recentUsers
            }
        });

    } catch (error) {
        return NextResponse.json({ code: 500, message: 'Failed to fetch admin stats' }, { status: 500 });
    }
}
