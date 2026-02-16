#!/bin/bash

# 富鱼比价 - GitHub 推送脚本

echo "🚀 准备推送代码到 GitHub..."
echo ""
echo "仓库地址: https://github.com/HarrisQianyu/-app.git"
echo ""

# 检查是否已经配置了远程仓库
if git remote | grep -q "origin"; then
    echo "✅ 远程仓库已配置"
else
    echo "⚙️  配置远程仓库..."
    git remote add origin https://github.com/HarrisQianyu/-app.git
fi

echo ""
echo "📤 开始推送代码..."
echo ""
echo "⚠️  系统会提示输入 GitHub 凭据："
echo "   Username: HarrisQianyu"
echo "   Password: 你的 Personal Access Token"
echo ""

# 推送代码
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 代码推送成功！"
    echo ""
    echo "📍 查看代码: https://github.com/HarrisQianyu/-app"
    echo ""
    echo "下一步："
    echo "1. 访问 https://vercel.com"
    echo "2. 导入你的 GitHub 仓库"
    echo "3. 部署到云端"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "💡 解决方案："
    echo "1. 确保 token 有 'repo' 权限"
    echo "2. 或使用 GitHub Desktop: https://desktop.github.com"
fi
