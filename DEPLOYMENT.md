# 部署指南

## 📋 部署前准备

### 1. 安装 Node.js

确保您的系统已安装 Node.js 18 或更高版本。

**检查版本**：
```bash
node --version
npm --version
```

**如果未安装**，请访问 [https://nodejs.org](https://nodejs.org) 下载安装。

### 2. 克隆或下载项目

项目位置：`/Users/hudie/.gemini/antigravity/scratch/price-hunter`

## 🚀 本地开发部署

### 步骤 1: 进入项目目录

```bash
cd /Users/hudie/.gemini/antigravity/scratch/price-hunter
```

### 步骤 2: 安装依赖

```bash
npm install
```

这将安装所有必要的依赖包，包括：
- Next.js 14
- React 18
- Tailwind CSS
- Zustand (状态管理)
- react-dropzone (图片上传)
- 其他依赖...

### 步骤 3: 启动开发服务器

```bash
npm run dev
```

服务器启动后，您将看到类似以下输出：

```
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

### 步骤 4: 访问应用

在浏览器中打开：**http://localhost:3000**

## 🌐 生产环境部署

### 方案 1: Vercel 部署（推荐）

Vercel 是 Next.js 的官方部署平台，部署最简单。

#### 步骤：

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   cd /Users/hudie/.gemini/antigravity/scratch/price-hunter
   vercel
   ```

4. **按照提示操作**
   - 选择项目名称
   - 确认项目设置
   - 等待部署完成

5. **获取部署地址**
   部署成功后，Vercel 会提供一个 URL，例如：
   `https://price-hunter-xxx.vercel.app`

### 方案 2: 传统服务器部署

#### 步骤 1: 构建生产版本

```bash
npm run build
```

#### 步骤 2: 启动生产服务器

```bash
npm start
```

#### 步骤 3: 使用 PM2 保持运行（可选）

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "price-hunter" -- start

# 设置开机自启
pm2 startup
pm2 save
```

### 方案 3: Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

构建和运行：

```bash
docker build -t price-hunter .
docker run -p 3000:3000 price-hunter
```

## 🔧 环境变量配置

创建 `.env.local` 文件（生产环境需要）：

```env
# API 配置（未来接入真实 API 时使用）
NEXT_PUBLIC_API_URL=https://your-api-url.com

# 淘宝 API
TAOBAO_APP_KEY=your_app_key
TAOBAO_APP_SECRET=your_app_secret

# 京东 API
JD_APP_KEY=your_app_key
JD_APP_SECRET=your_app_secret

# 图片存储（阿里云 OSS 或 AWS S3）
OSS_ACCESS_KEY_ID=your_access_key
OSS_ACCESS_KEY_SECRET=your_secret_key
OSS_BUCKET=your_bucket_name
OSS_REGION=oss-cn-hangzhou
```

## 📊 性能优化建议

### 1. 启用缓存

在 `next.config.js` 中配置：

```javascript
module.exports = {
  // ... 其他配置
  
  // 启用图片优化
  images: {
    domains: ['your-image-domain.com'],
  },
  
  // 启用压缩
  compress: true,
}
```

### 2. CDN 加速

- 将静态资源上传到 CDN
- 配置图片使用 CDN 地址

### 3. 数据库优化

- 添加索引
- 使用连接池
- 实现查询缓存

## 🔒 安全配置

### 1. HTTPS

生产环境必须使用 HTTPS：

- Vercel 自动提供 HTTPS
- 自建服务器需配置 SSL 证书（Let's Encrypt）

### 2. 环境变量

- 不要将敏感信息提交到 Git
- 使用 `.env.local` 存储密钥
- 确保 `.gitignore` 包含 `.env.local`

### 3. CORS 配置

如果有独立后端 API，需配置 CORS：

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'your-domain.com' },
        ],
      },
    ]
  },
}
```

## 📱 移动端适配

项目已使用 Tailwind CSS 实现响应式设计，支持：

- 手机（< 640px）
- 平板（640px - 1024px）
- 桌面（> 1024px）

## 🐛 故障排查

### 问题 1: 依赖安装失败

```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm cache clean --force

# 重新安装
npm install
```

### 问题 2: 端口被占用

```bash
# 查找占用 3000 端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或使用其他端口
PORT=3001 npm run dev
```

### 问题 3: 构建失败

检查 Node.js 版本是否 >= 18：

```bash
node --version
```

## 📞 技术支持

如遇到问题，请检查：

1. Node.js 版本是否正确
2. 依赖是否完整安装
3. 端口是否被占用
4. 环境变量是否正确配置

## 🎉 验收清单

部署完成后，请验证以下功能：

- [ ] 首页正常加载
- [ ] 图片上传功能正常
- [ ] 平台选择功能正常
- [ ] 搜索功能正常（Mock 数据）
- [ ] 搜索结果展示正常
- [ ] 价格筛选和排序正常
- [ ] 登录/注册页面正常
- [ ] 搜索历史页面正常
- [ ] 响应式设计在移动端正常
- [ ] 所有动画效果流畅

---

**部署时间**: 2026-02-16  
**项目版本**: v0.1.0
