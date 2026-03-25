# Three.js Learning Website / Three.js 学习网站

---

## Description / 简介

A modern Three.js learning platform with interactive examples and live code editing capabilities.

一个现代化的 Three.js 学习平台，提供从基础到进阶的交互式示例和实时代码编辑功能。

---

## Features / 功能特性

- **Interactive Learning / 交互式学习** - Real-time 3D preview and code editing / 实时 3D 预览和代码编辑
- **Progressive Tutorials / 渐进式教程** - Complete learning path from basic geometry to complex scenes / 从基础几何体到复杂场景的完整学习路径
- **Modern UI / 现代化 UI** - Responsive design with dark/light theme support / 响应式设计，支持深色/浅色主题切换
- **Code Editor / 代码编辑器** - Monaco Editor integration with syntax highlighting and autocomplete / 集成 Monaco Editor，支持语法高亮和自动补全
- **Real-time Preview / 实时预览** - Code changes reflected instantly in 3D scene / 代码修改即时反映到 3D 场景中

---

## Tech Stack / 技术栈

### Core Frameworks / 核心框架

- **React 18.3** - Modern React framework / 现代 React 框架
- **TypeScript 5.4** - Type-safe JavaScript / 类型安全的 JavaScript
- **Vite 6.0** - Fast build tool / 快速的构建工具

### Three.js Ecosystem / Three.js 生态

- **Three.js 0.168** - 3D graphics library / 3D 图形库
- **@react-three/fiber 8.16** - React Three.js renderer / React Three.js 渲染器
- **@react-three/drei 9.96** - Useful components library / 实用组件库

### Development Tools / 开发工具

- **Monaco Editor** - VS Code code editor / VS Code 同款编辑器
- **TailwindCSS 3.4** - Atomic CSS framework / 原子化 CSS 框架
- **Zustand 4.5** - Lightweight state management / 轻量级状态管理

---

## Installation / 安装和运行

### Requirements / 环境要求

- Node.js 18+
- npm or yarn

### Install Dependencies / 安装依赖

```bash
npm install
```

### Start Development Server / 启动开发服务器

```bash
npm run dev
```

Visit http://localhost:3000 to view the website / 访问 http://localhost:3000 查看网站

### Build for Production / 构建生产版本

```bash
npm run build
```

### Preview Production Build / 预览生产版本

```bash
npm run preview
```

---

## Learning Path / 学习路径

### Basic Examples / 基础示例

1. **Rotating Cube / 旋转立方体** - Learn basic geometry and animation / 学习基础几何体和动画
2. **Sphere / 球体** - Explore material properties and lighting / 探索材质属性和光照
3. **Plane / 平面** - Understand coordinate system and transforms / 理解坐标系统和变换
4. **Materials / 材质** - Compare different material types / 对比不同材质类型

### Lighting System / 光照系统

- Ambient Light / 环境光
- Directional Light / 方向光
- Point Light / 点光源
- Shadow Effects / 阴影效果

### Animation Effects / 动画效果

- Rotation Animation / 旋转动画
- Movement Animation / 移动动画
- Scaling Animation / 形变动画
- Camera Animation / 相机动画

### Advanced Topics / 进阶技术

- Particle Systems / 粒子系统
- Post-processing Effects / 后处理效果
- Physics Engine Integration / 物理引擎集成
- Custom Shaders / 自定义着色器

---

## Project Structure / 项目结构

```
src/
├── components/           # Common components / 通用组件
│   ├── ui/              # UI base components / UI 基础组件
│   ├── CodeEditor/      # Code editor / 代码编辑器
│   ├── ThreeCanvas/     # Three.js canvas component / Three.js 画布组件
│   ├── Navigation/      # Navigation component / 导航组件
│   └── examples/        # Three.js example components / Three.js 示例组件
├── pages/               # Page components / 页面组件
├── contexts/            # React Context
├── data/                # Example data / 示例数据
├── types/               # TypeScript type definitions / TypeScript 类型定义
├── hooks/               # Custom React hooks / 自定义 Hooks
├── i18n/                # Internationalization / 国际化
│   └── locales/         # Translation files / 翻译文件
└── utils/               # Utility functions / 工具函数
```

---

## Development Guide / 开发指南

### Adding a New Example / 添加新示例

1. Create a new component in `src/components/examples/`
2. Add the example data in `src/data/examples.ts`
3. Register the component in `src/components/ExampleDetailContent/index.tsx`

### Customizing Theme / 自定义主题

Modify the color configuration in `tailwind.config.js` to customize the theme.

### Code Standards / 代码规范

The project uses ESLint and Prettier to maintain code quality:

```bash
npm run lint    # Check code standards / 检查代码规范
npm run format  # Format code / 格式化代码
```

---

## Special Features / 特色功能

### Real-time Code Editing / 实时代码编辑

- Monaco Editor integration / Monaco Editor 集成
- Syntax highlighting and error hints / 语法高亮和错误提示
- Autocomplete and formatting / 自动补全和格式化

### 3D Scene Interaction / 3D 场景交互

- Orbit Controls / 轨道控制器 (OrbitControls)
- Grid helpers / 网格辅助线
- Shadow and lighting effects / 阴影和光照效果

### Responsive Design / 响应式设计

- Mobile adaptation / 移动端适配
- Dark/light theme / 深色/浅色主题
- Smooth animations / 流畅的动画效果

---

## License / 许可证

MIT License

---

## Contributing / 贡献

Contributions, issues and pull requests are welcome! / 欢迎提交 Issue 和 Pull Request 来改进这个项目！

## Contact / 联系方式

For questions or suggestions, please contact us via GitHub Issues. / 如有问题或建议，请通过 GitHub Issues 联系我们。
