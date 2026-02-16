// Mock 商品数据
export interface Product {
    id: string;
    platform: 'taobao' | 'jd' | 'pdd' | '1688';
    title: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    productUrl: string;
    sales: number;
    shopName: string;
    shopRating?: number;
    similarityScore: number;
}

// Mock 搜索历史
export interface SearchHistory {
    id: string;
    imageUrl: string;
    searchTime: string;
    resultCount: number;
    platforms: string[];
}

// 平台配置
export const platformConfig = {
    taobao: {
        name: '淘宝',
        color: '#FF6A00',
        icon: '🛒',
    },
    jd: {
        name: '京东',
        color: '#E3393C',
        icon: '🐶',
    },
    pdd: {
        name: '拼多多',
        color: '#E02E24',
        icon: '🍊',
    },
    '1688': {
        name: '1688',
        color: '#FF6A00',
        icon: '🏭',
    },
};

// Mock 商品数据
export const mockProducts: Product[] = [
    {
        id: '1',
        platform: 'jd',
        title: 'Apple iPhone 15 Pro Max 256GB 深空黑色 支持移动联通电信5G 双卡双待手机',
        price: 8999,
        originalPrice: 9999,
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
        productUrl: 'https://item.jd.com/100012345678.html',
        sales: 50000,
        shopName: 'Apple京东自营旗舰店',
        shopRating: 4.9,
        similarityScore: 98,
    },
    {
        id: '2',
        platform: 'taobao',
        title: 'Apple/苹果 iPhone 15 Pro Max 256G 深空黑 全网通5G手机 国行正品',
        price: 8799,
        originalPrice: 9999,
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
        productUrl: 'https://item.taobao.com/item.htm?id=123456789',
        sales: 30000,
        shopName: 'Apple官方旗舰店',
        shopRating: 4.8,
        similarityScore: 96,
    },
    {
        id: '3',
        platform: 'pdd',
        title: '【百亿补贴】Apple iPhone 15 Pro Max 256GB 深空黑 5G手机',
        price: 8599,
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
        productUrl: 'https://mobile.yangkeduo.com/goods.html?goods_id=123456',
        sales: 80000,
        shopName: '拼多多百亿补贴',
        shopRating: 4.7,
        similarityScore: 94,
    },
    {
        id: '4',
        platform: 'jd',
        title: 'Apple iPhone 15 Pro Max 256GB 原色钛金属 支持移动联通电信5G',
        price: 9199,
        originalPrice: 9999,
        imageUrl: 'https://images.unsplash.com/photo-1696446702094-b0f39473d8dc?w=400&h=400&fit=crop',
        productUrl: 'https://item.jd.com/100012345679.html',
        sales: 45000,
        shopName: 'Apple京东自营旗舰店',
        shopRating: 4.9,
        similarityScore: 92,
    },
    {
        id: '5',
        platform: 'taobao',
        title: 'Apple iPhone 15 Pro 128GB 深空黑色 5G手机 国行正品 全国联保',
        price: 7299,
        originalPrice: 7999,
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
        productUrl: 'https://item.taobao.com/item.htm?id=123456790',
        sales: 25000,
        shopName: 'Apple官方旗舰店',
        shopRating: 4.8,
        similarityScore: 88,
    },
    {
        id: '6',
        platform: '1688',
        title: 'Apple iPhone 15 Pro Max 256G 深空黑 原装正品 支持验机',
        price: 8299,
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
        productUrl: 'https://detail.1688.com/offer/123456.html',
        sales: 5000,
        shopName: '深圳华强北数码批发',
        shopRating: 4.5,
        similarityScore: 85,
    },
];

// Mock 搜索历史数据
export const mockSearchHistory: SearchHistory[] = [
    {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop',
        searchTime: '2026-02-16 09:30:00',
        resultCount: 6,
        platforms: ['淘宝', '京东', '拼多多', '1688'],
    },
    {
        id: '2',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
        searchTime: '2026-02-15 14:20:00',
        resultCount: 8,
        platforms: ['淘宝', '京东', '拼多多'],
    },
    {
        id: '3',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        searchTime: '2026-02-14 10:15:00',
        resultCount: 5,
        platforms: ['淘宝', '京东'],
    },
    {
        id: '4',
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop',
        searchTime: '2026-02-13 16:45:00',
        resultCount: 12,
        platforms: ['淘宝', '京东', '拼多多', '1688'],
    },
];

// 用户 Mock 数据
export interface User {
    id: string;
    email: string;
    username: string;
    avatar?: string;
}

export const mockUser: User = {
    id: '1',
    email: 'demo@pricehunter.com',
    username: '演示用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
};
