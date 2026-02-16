import { create } from 'zustand';
import { User, Product, SearchHistory } from '@/lib/mockData';

interface AppState {
    // 用户状态
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;

    // 搜索状态
    searchResults: Product[];
    setSearchResults: (results: Product[]) => void;
    isSearching: boolean;
    setIsSearching: (searching: boolean) => void;

    // 搜索历史
    searchHistory: SearchHistory[];
    addSearchHistory: (history: SearchHistory) => void;
    clearSearchHistory: () => void;

    // 选中的平台
    selectedPlatforms: string[];
    togglePlatform: (platform: string) => void;

    // 上传的图片
    uploadedImage: string | null;
    setUploadedImage: (image: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
    // 初始用户状态
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    login: async (email: string, password: string) => {
        // Mock 登录逻辑
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email && password) {
            const mockUser = {
                id: '1',
                email,
                username: email.split('@')[0],
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            };
            set({ user: mockUser, isAuthenticated: true });
            return true;
        }
        return false;
    },

    logout: () => set({ user: null, isAuthenticated: false }),

    // 搜索结果
    searchResults: [],
    setSearchResults: (results) => set({ searchResults: results }),

    isSearching: false,
    setIsSearching: (searching) => set({ isSearching: searching }),

    // 搜索历史
    searchHistory: [],
    addSearchHistory: (history) => set((state) => ({
        searchHistory: [history, ...state.searchHistory].slice(0, 100),
    })),
    clearSearchHistory: () => set({ searchHistory: [] }),

    // 平台选择
    selectedPlatforms: ['taobao', 'jd', 'pdd', '1688'],
    togglePlatform: (platform) => set((state) => {
        const platforms = state.selectedPlatforms.includes(platform)
            ? state.selectedPlatforms.filter(p => p !== platform)
            : [...state.selectedPlatforms, platform];
        return { selectedPlatforms: platforms };
    }),

    // 上传图片
    uploadedImage: null,
    setUploadedImage: (image) => set({ uploadedImage: image }),
}));
