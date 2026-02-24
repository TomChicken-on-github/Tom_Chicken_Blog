import { defineTeekConfig } from "vitepress-theme-teek/config";

export const teekConfig = defineTeekConfig({
<<<<<<< codex/modify-blog-to-teek-demo-style-qheff2
  teekHome: true,
  vpHome: false,
  loading: true,
  wallpaper: {
    enabled: true,
    hideBanner: true,
  },
=======
  teekHome: true, // 是否开启博客首页
  vpHome: false, // 是否隐藏 VP 首页
  post: {
    postStyle: "card", // 文章列表切换为博客卡片风格
  },
  sidebarTrigger: true, // 是否开启侧边栏折叠功能
  author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
>>>>>>> main
  footerInfo: {
    customHtml: '<span id="runtime"></span>',
    topMessage: [
      '<span><img alt="VitePress" src="https://liuyuyang.net/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fanimals.65eaf6e3.webp&w=750&q=75"><span/>',
      `<a title="Github release" target="_blank" href="https://github.com/Kele-Bingtang/vitepress-theme-teek/releases" style="margin-right: 10px;">
        <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/Kele-Bingtang/vitepress-theme-teek?logo=github">
      </a>

      <a title="Npm Version" target="_blank" href="https://www.npmjs.com/package/vitepress-theme-teek" style="margin-right: 10px;">
        <img src="https://img.shields.io/npm/v/vitepress-theme-teek?logo=npm&color=%09%23bf00ff" alt="https://img.shields.io/npm/v/vitepress-theme-teek?color=%09%23bf00ff">
      </a>

      <img src="https://img.shields.io/badge/v18.x-x?logo=node.js&label=node" alt="node version" style="margin-right: 10px;">
      <img src="https://img.shields.io/github/languages/code-size/Kele-Bingtang/vitepress-theme-teek?logo=Visual Studio Code&logoColor=blue" alt="GitHub code size in bytes" style="margin-right: 10px;">

      <a title="GitHub Discussions" target="_blank" href="https://github.com/Kele-Bingtang/vitepress-theme-teek/discussions" style="margin-right: 10px;">
        <img src="https://img.shields.io/github/discussions/Kele-Bingtang/vitepress-theme-teek?color=9cf&logo=github" alt="GitHub Discussions">
      </a>

      <a title="MIT License" target="_blank" href="https://github.com/Kele-Bingtang/vitepress-theme-teek/blob/master/LICENSE" style="margin-right: 10px;">
        <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License">
      </a>`,
    ],
  },
  docAnalysis: {
    createTime: "2025-03-23",
    statistics: {
      provider: "busuanzi",
    },
  },
  friendLink: {
    list: [
      {
        name: "Teeker",
        desc: "朝圣的使徒，正在走向编程的至高殿堂！",
        avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar2.png",
        link: "http://notes.teek.top/",
      },
      {
        name: "vuepress-theme-vdoing",
        desc: "🚀一款简洁高效的VuePress 知识管理&博客 主题",
        avatar: "https://doc.xugaoyi.com/img/logo.png",
        link: "https://doc.xugaoyi.com/",
      },
      {
        name: "One",
        desc: "明心静性，爱自己",
        avatar: "https://onedayxyy.cn/img/xyy.webp",
        link: "https://onedayxyy.cn/",
      },
      {
        name: "Hyde Blog",
        desc: "人心中的成见是一座大山",
        avatar: "https://teek.seasir.top/avatar/avatar.webp",
        link: "https://teek.seasir.top/",
      },
      {
        name: "二丫讲梵",
        desc: "💻学习📝记录🔗分享",
        avatar: "https://wiki.eryajf.net/img/logo.png",
        link: " https://wiki.eryajf.net/",
      },
      {
        name: "粥里有勺糖",
        desc: "简约风的 VitePress 博客主题",
        avatar: "https://theme.sugarat.top/logo.png",
        link: "https://theme.sugarat.top/",
      },
      {
        name: "VitePress 快速上手中文教程",
        desc: "如果你也想搭建它，那跟我一起做吧",
        avatar: "https://avatars.githubusercontent.com/u/90893790?v=4",
        link: "https://vitepress.yiov.top/",
      },
      {
        name: "友人A",
        desc: "おとといは兎をみたの，昨日は鹿，今日はあなた",
        avatar: "http://niubin.site/logo.jpg",
        link: "http://niubin.site/",
      },
    ],
    autoScroll: true,
  },
  social: [
    {
      icon: "icon-github",
      name: "GitHub",
      link: "https://github.com/kele-bingtang",
    },
    {
      icon: "icon-gitee",
      name: "Gitee",
      link: "https://gitee.com/kele-bingtang",
    },
  ],
  post: {
    postStyle: "card",
  },
  homeCardListPosition: "left",
  banner: {
    name: "🎉 Teek Blog",
    bgStyle: "fullImg",
    imgSrc: ["/blog/bg1.webp", "/blog/bg2.webp", "/blog/bg3.webp"],
    description: [
      "故事由我书写，旅程由你见证，传奇由她聆听 —— 来自 Young Kbt",
      "积跬步以至千里，致敬每个爱学习的你 —— 来自 Evan Xu",
      "这一生波澜壮阔或是不惊都没问题 —— 来自 Weibw",
    ],
    descStyle: "types",
  },
  sidebarTrigger: true,
  author: { name: "Teeker", link: "https://github.com/Kele-Bingtang" },
  codeBlock: {
    copiedDone: TkMessage => TkMessage.success("复制成功！"),
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
  },
});
