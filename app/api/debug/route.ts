import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const status = {
        env: {
            hasPrisma: !!prisma,
            hasDatabaseUrl: !!process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV,
        },
        connection: 'pending',
        tables: 'unknown',
        error: null as any,
    };

    try {
        if (!prisma) {
            status.connection = 'failed (prisma client is null)';
            return NextResponse.json(status, { status: 500 });
        }

        // 1. 尝试连接
        await prisma.$connect();
        status.connection = 'connected';

        // 2. 尝试查询（检查表是否存在）
        try {
            const userCount = await prisma.user.count();
            status.tables = `User table exists, count: ${userCount}`;

            const historyCount = await prisma.searchHistory.count();
            // @ts-ignore
            status.stats = { userCount, historyCount };

        } catch (queryError: any) {
            status.tables = 'failed to query tables';
            status.error = {
                message: queryError.message,
                code: queryError.code,
                meta: queryError.meta,
            };
        }

        return NextResponse.json(status);

    } catch (error: any) {
        status.connection = 'failed';
        status.error = error.message;
        return NextResponse.json(status, { status: 500 });
    }
}
