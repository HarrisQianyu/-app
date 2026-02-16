'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '@/lib/store';

export default function ImageUploader() {
    const { setUploadedImage } = useStore();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onload = () => {
                setUploadedImage(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    }, [setUploadedImage]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            className={`
        relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
        transition-all duration-300 ease-in-out
        ${isDragActive
                    ? 'border-primary-500 bg-primary-50 scale-105'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }
      `}
        >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center space-y-4">
                {/* 图标 */}
                <div className={`
          w-24 h-24 rounded-full flex items-center justify-center
          transition-all duration-300
          ${isDragActive
                        ? 'bg-gradient-primary scale-110'
                        : 'bg-gradient-to-br from-primary-100 to-secondary-100'
                    }
        `}>
                    <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>

                {/* 文字提示 */}
                <div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                        {isDragActive ? '松开鼠标上传图片' : '拖拽图片到这里，或点击上传'}
                    </p>
                    <p className="text-sm text-gray-500">
                        支持 JPG、PNG、WEBP、GIF 格式，最大 10MB
                    </p>
                </div>

                {/* 快捷键提示 */}
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Ctrl</kbd>
                    <span>+</span>
                    <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">V</kbd>
                    <span>粘贴图片</span>
                </div>
            </div>
        </div>
    );
}
