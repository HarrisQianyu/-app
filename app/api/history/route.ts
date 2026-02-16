import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/**
 * 搜索历史查询接口
 * GET /api/history
 * 
 * @description 获取用户的搜索历史记录
 * @author FuYu Team
 * @date 2026-02-16
 */

// 从请求头中提取并验证 JWT Token
function getUserIdFromToken(request: NextRequest): string | null {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'fuyu-default-secret'
        ) as { userId: string };

        return decoded.userId;
    } catch (error) {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        // 检查数据库连接
        if (!prisma) {
            return NextResponse.json(
                {
                    code: 503,
                    message: '数据库未配置，请联系管理员',
                    data: null,
                },
                { status: 503 }
            );
        }

        // 1. 验证用户身份
        const userId = getUserIdFromToken(request);

        if (!userId) {
            return NextResponse.json(
                {
                    code: 401,
                    message: '未授权，请先登录',
                    data: null,
                },
                { status: 401 }
            );
        }

        // 2. 获取分页参数
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = parseInt(searchParams.get('pageSize') || '10');
        const skip = (page - 1) * pageSize;

        // 3. 查询搜索历史
        const [histories, total] = await Promise.all([
            prisma.searchHistory.findMany({
                where: { userId },
                include: {
                    results: {
                        orderBy: { similarityScore: 'desc' },
                        take: 3, // 每条历史只返回前3个结果作为预览
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: pageSize,
            }),
            prisma.searchHistory.count({
                where: { userId },
            }),
        ]);

        // 4. 返回结果
        return NextResponse.json(
            {
                code: 200,
                message: '查询成功',
                data: {
                    histories,
                    pagination: {
                        page,
                        pageSize,
                        total,
                        totalPages: Math.ceil(total / pageSize),
                    },
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get history error:', error);
        return NextResponse.json(
            {
                code: 500,
                message: '查询失败',
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

/**
 * 删除搜索历史
 * DELETE /api/history/:id
 */
export async function DELETE(request: NextRequest) {
    try {
        // 检查数据库连接
        if (!prisma) {
            return NextResponse.json(
                {
                    code: 503,
                    message: '数据库未配置，请联系管理员',
                    data: null,
                },
                { status: 503 }
            );
        }

        // 1. 验证用户身份
        const userId = getUserIdFromToken(request);

        if (!userId) {
            return NextResponse.json(
                {
                    code: 401,
                    message: '未授权，请先登录',
                    data: null,
                },
                { status: 401 }
            );
        }

        // 2. 获取历史记录 ID
        const { searchParams } = new URL(request.url);
        const historyId = searchParams.get('id');

        if (!historyId) {
            return NextResponse.json(
                {
                    code: 400,
                    message: '缺少历史记录ID',
                    data: null,
                },
                { status: 400 }
            );
        }

        // 3. 验证记录所有权并删除
        const history = await prisma.searchHistory.findFirst({
            where: {
                id: historyId,
                userId,
            },
        });

        if (!history) {
            return NextResponse.json(
                {
                    code: 404,
                    message: '历史记录不存在',
                    data: null,
                },
                { status: 404 }
            );
        }

        await prisma.searchHistory.delete({
            where: { id: historyId },
        });

        // 4. 返回成功响应
        return NextResponse.json(
            {
                code: 200,
                message: '删除成功',
                data: null,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete history error:', error);
        return NextResponse.json(
            {
                code: 500,
                message: '删除失败',
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
