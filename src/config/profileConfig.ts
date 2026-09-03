import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/HOSHINO_pfp.webp",

	// 名字
	name: "Tom_Chicken",

	// 个人签名
	bio: "✨時よ止まれ、お前は美しい",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://github.com/TomChicken-on-github/",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://steamcommunity.com/id/Tom_Chicken/",
		},
		{
			name: "Discord",
			icon: "fa6-brands:discord",
			url: "https://discordapp.com/users/tom_chicken114514",
		},
		{
			name: "VRChat",
			icon: "simple-icons:vrchat",
			url: "https://vrchat.com/home/user/usr_8116a173-a4ad-4f23-9414-7fc0960e1fcf",
		},
	],
};
