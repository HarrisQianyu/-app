#!/bin/bash

echo "🎯 比价猎手 - 快速启动脚本"
echo "================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js"
    echo "请先安装 Node.js: https://nodejs.org"
    echo ""
    echo "推荐安装方式："
    echo "  brew install node"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 进入项目目录
cd "$(dirname "$0")"

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，正在安装依赖..."
    echo "这可能需要几分钟时间，请耐心等待..."
    echo ""
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    
    echo ""
    echo "✅ 依赖安装完成！"
    echo ""
fi

# 启动开发服务器
echo "🚀 启动开发服务器..."
echo ""
echo "服务器启动后，请访问："
echo "  👉 http://localhost:3000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "================================"
echo ""

npm run dev
