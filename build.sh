#!/bin/bash
# 版本 3 优化脚本

set -e  # 报错立即终止，方便查看日志

echo "🔧 Node: $(node -v)"
echo "📦 PNPM: $(pnpm -v)"

# 版本 3 的缓存清理（如遇奇怪错误可取消注释）
# rm -rf node_modules .pnpm-store

# 安装依赖
echo "📥 Installing dependencies..."
pnpm install --frozen-lockfile

# 构建
echo "🏗️ Building..."
pnpm hexo clean
pnpm hexo generate

echo "✅ Build completed!"