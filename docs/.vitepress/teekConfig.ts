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
      "<span>欢迎来到我的博客，正在持续建设中。</span>",
      "<span>你可以按需替换这里的徽章、备案信息或版权信息。</span>",
    ],
    // 保留并展示主题版权，致谢开源贡献者
    theme: {
      show: true,
      name: "Teek",
      link: "https://github.com/Kele-Bingtang/vitepress-theme-teek",
    },
  },
  docAnalysis: {
    // TODO: 改成你自己的建站日期
    createTime: "2026-01-01",
  },
  friendLink: {
    // 先保留结构，避免继续显示官方 demo 友情链接
    list: [],
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
  banner: {
    name: "✨ Tom_Chicken Blog",
    bgStyle: "fullImg",
    imgSrc: ["/blog/bg1.webp", "/blog/bg2.webp", "/blog/bg3.webp"],
    description: [
      "记录学习、思考与生活。",
      "把长期主义写进每一篇文章。",
      "欢迎来到我的数字花园。",
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
