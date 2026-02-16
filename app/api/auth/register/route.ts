import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

/**
 * 用户注册接口
 * POST /api/auth/register
 * 
 * @description 用户注册，创建新用户账号
 * @author FuYu Team
 * @date 2026-02-16
 */

// 请求参数验证 Schema
const registerSchema = z.object({
    email: z.string().email('邮箱格式不正确'),
    username: z.string().min(2, '用户名至少2个字符').max(20, '用户名最多20个字符'),
    password: z.string().min(6, '密码至少6个字符').max(50, '密码最多50个字符'),
});

export async function POST(request: NextRequest) {
    // 数据库连接检查
    try {
        await prisma.$connect();
    } catch (dbError) {
        console.error('Database connection error:', dbError);
        return NextResponse.json(
            {
                code: 500,
                message: '数据库连接失败',
                data: null,
                error: dbError instanceof Error ? dbError.message : 'Unknown database error',
            },
            { status: 500 }
        );
    }

    try {
        // 1. 解析请求体
        const body = await request.json();

        // 2. 参数验证
        const validationResult = registerSchema.safeParse(body);
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

        const { email, username, password } = validationResult.data;

        // 3. 检查邮箱是否已存在
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    code: 409,
                    message: '该邮箱已被注册',
                    data: null,
                },
                { status: 409 }
            );
        }

        // 4. 加密密码
        const passwordHash = await bcrypt.hash(password, 10);

        // 5. 创建用户
        const user = await prisma.user.create({
            data: {
                email,
                username,
                passwordHash,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            },
            select: {
                id: true,
                email: true,
                username: true,
                avatar: true,
                createdAt: true,
            },
        });

        // 6. 生成 JWT Token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'fuyu-default-secret',
            { expiresIn: '7d' }
        );

        // 7. 返回成功响应
        return NextResponse.json(
            {
                code: 200,
                message: '注册成功',
                data: {
                    user,
                    token,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json(
            {
                code: 500,
                message: '服务器内部错误',
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
