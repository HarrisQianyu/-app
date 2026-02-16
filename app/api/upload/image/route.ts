import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { z } from 'zod';

/**
 * 图片上传接口
 * POST /api/upload/image
 * 
 * @description 处理图片上传，压缩并保存到服务器
 * @author FuYu Team
 * @date 2026-02-16
 */

export async function POST(request: NextRequest) {
    try {
        // 1. 解析 FormData
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json(
                {
                    code: 400,
                    message: '请上传图片文件',
                    data: null,
                },
                { status: 400 }
            );
        }

        // 2. 验证文件类型
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    code: 400,
                    message: '不支持的图片格式，仅支持 JPG、PNG、WEBP',
                    data: null,
                },
                { status: 400 }
            );
        }

        // 3. 验证文件大小（最大 10MB）
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                {
                    code: 400,
                    message: '图片大小不能超过 10MB',
                    data: null,
                },
                { status: 400 }
            );
        }

        // 4. 读取文件内容
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 5. 使用 Sharp 压缩图片
        const compressedBuffer = await sharp(buffer)
            .resize(1200, 1200, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .jpeg({ quality: 85 })
            .toBuffer();

        // 6. 生成唯一文件名
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const filename = `${timestamp}-${randomString}.jpg`;

        // 7. 保存文件（开发环境）
        // 注意：生产环境应该使用云存储（阿里云 OSS、AWS S3 等）
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        const filepath = join(uploadDir, filename);

        // 确保上传目录存在
        try {
            await writeFile(filepath, compressedBuffer);
        } catch (error) {
            // 如果目录不存在，创建它
            const { mkdir } = await import('fs/promises');
            await mkdir(uploadDir, { recursive: true });
            await writeFile(filepath, compressedBuffer);
        }

        // 8. 返回图片 URL
        const imageUrl = `/uploads/${filename}`;

        return NextResponse.json(
            {
                code: 200,
                message: '图片上传成功',
                data: {
                    url: imageUrl,
                    filename,
                    size: compressedBuffer.length,
                    originalSize: file.size,
                    compressionRatio: ((1 - compressedBuffer.length / file.size) * 100).toFixed(2) + '%',
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            {
                code: 500,
                message: '图片上传失败',
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
