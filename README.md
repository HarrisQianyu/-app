# 富鱼比价 (FuYu Price Comparison)

智能电商全网比价平台 - 通过AI图像识别技术，帮助用户快速找到同一商品在全网电商平台的最优价格。

## 🎯 功能特性

- ✅ 图片上传搜索（支持拖拽、点击、粘贴）
- ✅ 全网比价（淘宝、京东、拼多多、1688）
- ✅ 智能相似度匹配
- ✅ 价格筛选和排序
- ✅ 搜索历史记录
- ✅ 用户登录注册
- ✅ 精美的 UI 设计
- ✅ 完整的后端 API 架构
- ✅ 数据库支持（Prisma + PostgreSQL）

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- PostgreSQL 数据库（云端部署时需要）

### 本地开发

1. **克隆项目**
   ```bash
   cd /Users/hudie/.gemini/antigravity/scratch/price-hunter
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   创建 `.env.local` 文件：
   ```env
   # 数据库连接（本地开发可选）
   DATABASE_URL="postgresql://user:password@localhost:5432/pricehunter"
   
   # JWT 密钥
   JWT_SECRET="your-secret-key-change-this-in-production"
   
   # 电商平台 API（未来使用）
   TAOBAO_APP_KEY=your_key
   TAOBAO_APP_SECRET=your_secret
   JD_APP_KEY=your_key
   JD_APP_SECRET=your_secret
   ```

4. **运行开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📦 技术栈

### 前端
- **框架**: Next.js 14 (React 18)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **图片上传**: react-dropzone

### 后端
- **API**: Next.js API Routes
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: JWT + bcryptjs
- **图片处理**: Sharp

## 📁 项目结构

```
price-hunter/
├── app/                    # Next.js 应用目录
│   ├── api/               # API 路由
│   ├── page.tsx           # 主页（搜索页面）
│   ├── login/             # 登录页面
│   ├── history/           # 搜索历史页面
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Navbar.tsx         # 导航栏
│   ├── ImageUploader.tsx  # 图片上传组件
│   └── ProductCard.tsx    # 商品卡片组件
├── lib/                   # 工具库
│   ├── store.ts           # Zustand 状态管理
│   ├── prisma.ts          # Prisma 客户端
│   └── mockData.ts        # Mock 数据
├── prisma/                # 数据库
│   └── schema.prisma      # 数据库 Schema
└── public/                # 静态资源
```

## 🗄️ 数据库

### 初始化数据库

```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送 Schema 到数据库
npm run db:push

# 或使用迁移（推荐生产环境）
npm run db:migrate
```

### 数据库表结构

- `users` - 用户表
- `search_histories` - 搜索历史表
- `search_results` - 搜索结果表
- `api_logs` - API 调用日志表

## 🌐 云端部署

### Vercel 部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/price-hunter.git
   git push -u origin main
   ```

2. **在 Vercel 导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - 配置环境变量
   - 点击 "Deploy"

3. **配置数据库**
   
   推荐使用 [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) 或 [Supabase](https://supabase.com)

### 环境变量配置

在 Vercel 项目设置中添加：

```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
TAOBAO_APP_KEY=your_key
TAOBAO_APP_SECRET=your_secret
JD_APP_KEY=your_key
JD_APP_SECRET=your_secret
```

## 🔧 当前状态

**注意**: 当前版本使用 Mock 数据进行演示，未接入真实电商 API。

要接入真实 API，需要：

1. 申请淘宝开放平台账号
2. 申请京东开放平台账号
3. 配置 API 密钥
4. 实现后端 API 调用逻辑

## 📝 开发计划

- [x] 前端框架搭建
- [x] 数据库设计
- [x] 用户认证系统（Mock）
- [ ] 接入真实电商 API
- [ ] 实现真实用户认证
- [ ] 添加价格监控功能
- [ ] 开发浏览器插件
- [ ] 移动端适配优化

## 📄 文档

- [部署指南](./DEPLOYMENT.md) - 详细的部署说明
- [产品需求文档](../brain/product_requirements.md) - 完整的功能规划
- [项目交付文档](../brain/walkthrough.md) - 开发总结

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

---

**开发时间**: 2026-02-16  
**版本**: v0.2.0  
**品牌**: 富鱼比价
