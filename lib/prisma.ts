import { PrismaClient } from '@prisma/client';

// 全局 Prisma 客户端实例
// 避免在开发环境中创建多个实例
declare global {
    var prisma: PrismaClient | undefined;
}

// 只在有数据库连接时创建 Prisma 客户端
let prisma: PrismaClient | undefined;

if (process.env.DATABASE_URL) {
    prisma = global.prisma || new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

    if (process.env.NODE_ENV !== 'production') {
        global.prisma = prisma;
    }
}

export default prisma;
