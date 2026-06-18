# NexMent — 部署说明（让全世界都能访问）

这是一个 Vite + React 单页网站，纯前端、无后端。
交互/表单（填 field/profile → 模拟匹配校友 mentor）全部跑在浏览器里。

## 本地预览
```bash
npm install
npm run dev      # 打开终端给出的 http://localhost:5173
```

## 部署到 Vercel（推荐，5 分钟，免费，拿到公开网址）
1. 把这个文件夹推到一个 GitHub 仓库：
   ```bash
   git init && git add . && git commit -m "init"
   # 在 github.com 新建一个空仓库，然后：
   git remote add origin <你的仓库地址>
   git push -u origin main
   ```
2. 打开 https://vercel.com ，用 GitHub 登录
3. 点 "Add New… → Project" → 选这个仓库
4. Vercel 自动识别 Vite，无需改配置 → 点 "Deploy"
5. 1~2 分钟后得到公开网址：https://你的项目名.vercel.app
6. 以后每次 `git push`，线上自动更新，网址不变

## 部署到 Netlify（备选，几乎一样）
- 方式一：把仓库连上 netlify.com，构建命令 `npm run build`，发布目录 `dist`
- 方式二（最快，不用 GitHub）：本地跑 `npm run build`，把生成的 `dist/` 文件夹
  直接拖到 https://app.netlify.com/drop ，立刻拿到公开链接

## 改内容在哪
- 文案、校友数据、匹配逻辑：全部在 `src/App.jsx`
  - 顶部 `ALUMNI` 数组 = 可匹配的校友（改名字/领域/介绍）
  - `matchAlumnus()` = 匹配规则（目前按 field/goal 关键词打分）
  - 各 section 组件 = About 文案
