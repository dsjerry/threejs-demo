# Three.js 学习网站

一个现代化的 Three.js 学习平台，提供从基础到进阶的交互式示例和实时代码编辑功能。

## 🚀 功能特性

- **交互式学习** - 实时 3D 预览和代码编辑
- **渐进式教程** - 从基础几何体到复杂场景的完整学习路径
- **现代化UI** - 响应式设计，支持深色/浅色主题切换
- **代码编辑器** - 集成 Monaco Editor，支持语法高亮和自动补全
- **实时预览** - 代码修改即时反映到 3D 场景中

## 🛠️ 技术栈

### 核心框架
- **React 18.3** - 现代 React 框架
- **TypeScript 5.4** - 类型安全的 JavaScript
- **Vite 6.0** - 快速的构建工具

### Three.js 生态
- **Three.js 0.162** - 3D 图形库
- **@react-three/fiber 8.16** - React Three.js 渲染器
- **@react-three/drei 9.96** - 实用组件库

### 开发工具
- **Monaco Editor** - VS Code 同款编辑器
- **TailwindCSS 3.4** - 原子化 CSS 框架
- **Zustand 4.5** - 轻量级状态管理

## 📦 安装和运行

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📚 学习路径

### 基础示例
1. **旋转立方体** - 学习基础几何体和动画
2. **球体** - 探索材质属性和光照
3. **平面** - 理解坐标系统和变换
4. **材质** - 对比不同材质类型

### 光照系统
- 环境光 (Ambient Light)
- 方向光 (Directional Light)  
- 点光源 (Point Light)
- 阴影效果

### 动画效果
- 旋转动画
- 移动动画
- 形变动画
- 相机动画

### 进阶技术
- 粒子系统
- 后处理效果
- 物理引擎集成
- 自定义着色器

## 🎯 项目结构

```
src/
├── components/           # 通用组件
│   ├── ui/              # UI 基础组件
│   ├── CodeEditor/      # 代码编辑器
│   ├── ThreeCanvas/     # Three.js 画布组件
│   ├── Navigation/      # 导航组件
│   └── examples/        # Three.js 示例组件
├── pages/               # 页面组件
├── contexts/            # React Context
├── data/                # 示例数据
├── types/               # TypeScript 类型定义
└── utils/               # 工具函数
```

## 🔧 开发指南

### 添加新示例

1. 在 `src/components/examples/` 创建新组件
2. 在 `src/data/examples.ts` 添加示例数据
3. 在 `ExampleDetailPage.tsx` 中注册组件

### 自定义主题

修改 `tailwind.config.js` 中的颜色配置来自定义主题。

### 代码规范

项目使用 ESLint 和 Prettier 来保持代码质量：

```bash
npm run lint    # 检查代码规范
npm run format  # 格式化代码
```

## 🌟 特色功能

### 实时代码编辑
- Monaco Editor 集成
- 语法高亮和错误提示
- 自动补全和格式化

### 3D 场景交互
- 轨道控制器 (OrbitControls)
- 网格辅助线
- 阴影和光照效果

### 响应式设计
- 移动端适配
- 深色/浅色主题
- 流畅的动画效果

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📞 联系方式

如有问题或建议，请通过 GitHub Issues 联系我们。
