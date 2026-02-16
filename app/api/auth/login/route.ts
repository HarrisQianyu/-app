import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

/**
 * 用户登录接口
 * POST /api/auth/login
 * 
 * @description 用户登录，验证凭据并返回 JWT Token
 * @author FuYu Team
 * @date 2026-02-16
 */

// 请求参数验证 Schema
const loginSchema = z.object({
    email: z.string().email('邮箱格式不正确'),
    password: z.string().min(1, '密码不能为空'),
});

export async function POST(request: NextRequest) {
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

        // 1. 解析请求体
        const body = await request.json();

        // 2. 参数验证
        const validationResult = loginSchema.safeParse(body);
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

        const { email, password } = validationResult.data;

        // 3. 查找用户
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                {
                    code: 401,
                    message: '邮箱或密码错误',
                    data: null,
                },
                { status: 401 }
            );
        }

        // 4. 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    code: 401,
                    message: '邮箱或密码错误',
                    data: null,
                },
                { status: 401 }
            );
        }

        // 5. 生成 JWT Token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'fuyu-default-secret',
            { expiresIn: '7d' }
        );

        // 6. 返回成功响应
        return NextResponse.json(
            {
                code: 200,
                message: '登录成功',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        avatar: user.avatar,
                        createdAt: user.createdAt,
                    },
                    token,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
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
