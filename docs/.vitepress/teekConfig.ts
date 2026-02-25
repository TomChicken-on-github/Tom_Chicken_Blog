import { defineTeekConfig } from "vitepress-theme-teek/config";

export const teekConfig = defineTeekConfig({
  teekHome: true,
  vpHome: false,
  loading: true,
  wallpaper: {
    enabled: true,
    hideBanner: true,
  },
  footerInfo: {
    customHtml: '<span id="runtime"></span>',
    topMessage: [
      "<span>欢迎来到我的博客，正在持续建设中喵。</span>",
    ],
    // 保留并展示主题版权，致谢开源贡献者
    theme: {
      show: true,
      name: "Teek",
      link: "https://github.com/Kele-Bingtang/vitepress-theme-teek",
    },
  },
  siteAnalytics: [
    {
      provider: "google",
      options: {
        id: "G-4R0BXB63KK",
      },
    },
  ],
  docAnalysis: {
    // TODO: 改成你自己的建站日期
    createTime: "2026-01-01",
  },
  friendLink: {
    // 保留友链框架：先不展示默认站点，后续按你的链接逐条补充
    title: "${icon}友情链接",
    list: [
      // {
      //   name: "示例站点",
      //   desc: "一句话介绍",
      //   avatar: "https://example.com/avatar.png",
      //   link: "https://example.com",
      // },
    ],
    autoScroll: false,
  },
  social: [
    {
      icon: "icon-github",
      name: "GitHub",
      link: "https://github.com/TomChicken-on-github",
    },
  ],
  post: {
    postStyle: "card",
  },
  homeCardListPosition: "left",
  blogger: {
    name: "Tom_Chicken",
    slogan: "时よ止まれ、お前は美しい",
    avatar: "https://q1.qlogo.cn/g?b=qq&nk=2674407845&s=100",
    shape: "circle-rotate",
    circleBgImg: "https://api.imlazy.ink/img-phone",
    circleBgMask: true,
    circleSize: 100,
    color: "#ffffff",
    status: {
      icon: "😪",
      size: 24,
      title: "困",
    },
  },
  banner: {
    name: "✨ Tom_ChickenのBlog",
    bgStyle: "fullImg",
    // 雫 API（GET https://api.imlazy.ink/img/）返回图片资源，用于首页 Banner 背景
    imgSrc: "https://api.imlazy.ink/img/",
    description: [
      "𝒞𝓲𝒶𝓵𝓁𝓸～ (∠・ω< )⌒★~",
      "時よ止まれ、お前は美しい",
      "与你的日常，便是奇迹",
      "欢迎来到我的博客喵",
    ],
    descStyle: "types",
  },
  sidebarTrigger: true,
  author: { name: "Tom_Chicken", link: "https://github.com/TomChicken-on-github" },
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
