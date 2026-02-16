import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "富鱼比价 - 智能电商全网比价平台",
    description: "通过AI图像识别技术，帮助您快速找到同一商品在全网电商平台的最优价格，实现一键比价，节省购物成本。",
    keywords: "富鱼比价,全网比价,电商,淘宝,京东,拼多多,以图搜图,价格对比",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
