# 富鱼比价 API 接口文档

## 📋 概述

本文档描述了富鱼比价平台的所有 API 接口，包括请求格式、响应格式和错误处理。

### 基础信息

- **Base URL**: `https://your-domain.com/api`
- **Content-Type**: `application/json`
- **认证方式**: JWT Bearer Token

### 统一响应格式

所有 API 接口遵循统一的响应格式：

```typescript
{
  code: number;        // 状态码
  message: string;     // 响应消息
  data: any | null;    // 响应数据
  errors?: any[];      // 错误详情（可选）
}
```

### 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（需要登录）|
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 409 | 资源冲突 |
| 500 | 服务器内部错误 |

---

## 🔐 认证接口

### 1. 用户注册

**接口**: `POST /api/auth/register`

**描述**: 创建新用户账号

**请求参数**:

```typescript
{
  email: string;      // 邮箱（必填）
  username: string;   // 用户名（必填，2-20字符）
  password: string;   // 密码（必填，6-50字符）
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "user": {
      "id": "clx1234567890",
      "email": "user@example.com",
      "username": "张三",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=user@example.com",
      "createdAt": "2026-02-16T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**错误响应**:

```json
{
  "code": 409,
  "message": "该邮箱已被注册",
  "data": null
}
```

---

### 2. 用户登录

**接口**: `POST /api/auth/login`

**描述**: 用户登录，获取 JWT Token

**请求参数**:

```typescript
{
  email: string;      // 邮箱（必填）
  password: string;   // 密码（必填）
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "user": {
      "id": "clx1234567890",
      "email": "user@example.com",
      "username": "张三",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=user@example.com",
      "createdAt": "2026-02-16T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**错误响应**:

```json
{
  "code": 401,
  "message": "邮箱或密码错误",
  "data": null
}
```

---

## 📤 文件上传接口

### 3. 图片上传

**接口**: `POST /api/upload/image`

**描述**: 上传商品图片，自动压缩处理

**Content-Type**: `multipart/form-data`

**请求参数**:

```typescript
{
  image: File;  // 图片文件（必填，支持 JPG/PNG/WEBP，最大10MB）
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "图片上传成功",
  "data": {
    "url": "/uploads/1708070400000-abc123.jpg",
    "filename": "1708070400000-abc123.jpg",
    "size": 245678,
    "originalSize": 1234567,
    "compressionRatio": "80.11%"
  }
}
```

**错误响应**:

```json
{
  "code": 400,
  "message": "图片大小不能超过 10MB",
  "data": null
}
```

---

## 🔍 搜索接口

### 4. 以图搜图

**接口**: `POST /api/search/image`

**描述**: 根据图片搜索全网电商平台的相似商品

**请求头**:

```
Authorization: Bearer <token>  // 可选，登录用户会保存搜索历史
```

**请求参数**:

```typescript
{
  imageUrl: string;   // 图片URL（必填）
  userId?: string;    // 用户ID（可选，用于保存历史）
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "搜索成功",
  "data": {
    "results": [
      {
        "platform": "taobao",
        "productId": "tb_1708070400000",
        "title": "【淘宝】时尚休闲运动鞋 透气舒适跑步鞋",
        "price": 299.00,
        "originalPrice": 599.00,
        "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "productUrl": "https://taobao.com/item/123456",
        "sales": 15234,
        "shopName": "官方旗舰店",
        "shopRating": 4.9,
        "similarityScore": 95
      }
    ],
    "total": 3,
    "platforms": ["taobao", "jd", "pdd"]
  }
}
```

---

## 📜 历史记录接口

### 5. 获取搜索历史

**接口**: `GET /api/history?page=1&pageSize=10`

**描述**: 获取用户的搜索历史记录（需要登录）

**请求头**:

```
Authorization: Bearer <token>  // 必填
```

**查询参数**:

```typescript
{
  page?: number;      // 页码（可选，默认1）
  pageSize?: number;  // 每页数量（可选，默认10）
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "查询成功",
  "data": {
    "histories": [
      {
        "id": "clx1234567890",
        "imageUrl": "/uploads/1708070400000-abc123.jpg",
        "resultCount": 3,
        "createdAt": "2026-02-16T10:00:00.000Z",
        "results": [
          {
            "platform": "taobao",
            "title": "商品标题",
            "price": 299.00,
            "similarityScore": 95
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

---

### 6. 删除搜索历史

**接口**: `DELETE /api/history?id=<historyId>`

**描述**: 删除指定的搜索历史记录（需要登录）

**请求头**:

```
Authorization: Bearer <token>  // 必填
```

**查询参数**:

```typescript
{
  id: string;  // 历史记录ID（必填）
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

---

## 🔒 认证说明

### 如何使用 JWT Token

1. **获取 Token**: 通过登录或注册接口获取
2. **使用 Token**: 在请求头中添加：

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Token 有效期**: 7天
4. **Token 刷新**: 当前版本需要重新登录

### 示例代码

**JavaScript/TypeScript**:

```typescript
// 登录
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
});

const { data } = await loginResponse.json();
const token = data.token;

// 使用 Token 调用需要认证的接口
const historyResponse = await fetch('/api/history?page=1', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});
```

---

## 🚨 错误处理

### 常见错误

#### 1. 参数验证失败 (400)

```json
{
  "code": 400,
  "message": "参数验证失败",
  "data": null,
  "errors": [
    {
      "path": ["email"],
      "message": "邮箱格式不正确"
    }
  ]
}
```

#### 2. 未授权 (401)

```json
{
  "code": 401,
  "message": "未授权，请先登录",
  "data": null
}
```

#### 3. 服务器错误 (500)

```json
{
  "code": 500,
  "message": "服务器内部错误",
  "data": null,
  "error": "Database connection failed"
}
```

---

## 📝 开发规范

### 阿里巴巴 Java 开发手册适配

本 API 遵循阿里巴巴开发规范的核心原则：

1. **统一响应格式**: 所有接口使用相同的响应结构
2. **明确的错误码**: 使用标准 HTTP 状态码
3. **详细的参数验证**: 使用 Zod 进行运行时类型检查
4. **安全性**: 密码加密、JWT 认证、SQL 注入防护
5. **日志记录**: 所有错误都会记录到控制台
6. **代码注释**: 每个接口都有详细的 JSDoc 注释

---

## 🔄 版本历史

### v0.2.0 (2026-02-16)

- ✅ 用户注册/登录接口
- ✅ 图片上传接口
- ✅ 以图搜图接口（Mock 数据）
- ✅ 搜索历史接口
- ✅ JWT 认证机制
- ✅ 统一错误处理

### 未来计划

- [ ] 接入真实电商 API
- [ ] Token 刷新机制
- [ ] 用户信息修改接口
- [ ] 价格监控接口
- [ ] WebSocket 实时通知

---

**文档版本**: v0.2.0  
**最后更新**: 2026-02-16  
**维护团队**: 富鱼比价开发团队
