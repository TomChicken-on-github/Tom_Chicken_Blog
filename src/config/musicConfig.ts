import type { MusicPlayerConfig } from "../types/musicConfig";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 是否在侧边栏显示音乐播放器组件
	showInSidebar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// Meting API 配置
	meting: {
		api: "https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		server: "netease",
		type: "artist",
		id: "15021101",
		auth: "",
		fallbackApis: [
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	local: {
		playlist: [
			{
				name: "Byoushinwo Kamu",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Byoushinwo Kamu.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Byoushinwo Kamu.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Byoushinwo Kamu.lrc",
			},
			{
				name: "Humanoid",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2018/09. Humanoid.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2018/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2018/09. Humanoid.lrc",
			},
			{
				name: "Nouriueno Cracker",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Nouriueno Cracker.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Nouriueno Cracker.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Nouriueno Cracker.lrc",
			},
			{
				name: "Saturn",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/03. Saturn.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/03. Saturn.lrc",
			},
			{
				name: "Uni To Kuri",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/04. Uni To Kuri.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/04. Uni To Kuri.lrc",
			},
			{
				name: "Kimigaite Mizuninaru",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/06. Kimigaite Mizuninaru.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/06. Kimigaite Mizuninaru.lrc",
			},
			{
				name: "Inemuri Enseitai",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/03. Inemuri Enseitai.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/03. Inemuri Enseitai.lrc",
			},
			{
				name: "Haze Haseru Haterumade",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/04. Haze Haseru Haterumade.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/04. Haze Haseru Haterumade.lrc",
			},
			{
				name: "Kettobashita Moufu",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/05. Kettobashita Moufu.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/05. Kettobashita Moufu.lrc",
			},
			{
				name: "Dear. Mr_F_",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/06. Dear. Mr_F_.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/06. Dear. Mr_F_.lrc",
			},
			{
				name: "Konnakoto Soudou",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/07. Konnakoto Soudou.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/07. Konnakoto Soudou.lrc",
			},
			{
				name: "Glass to Rum Raisin",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/10. Glass to Rum Raisin.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/10. Glass to Rum Raisin.lrc",
			},
			{
				name: "Yasashiku Last Smile",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/12. Yasashiku Last Smile.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/12. Yasashiku Last Smile.lrc",
			},
			{
				name: "Kan Saete Kuyashiiwa",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/01. Kan Saete Kuyashiiwa.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/01. Kan Saete Kuyashiiwa.lrc",
			},
			{
				name: "Matane Maboroshi",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/03. Matane Maboroshi.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/03. Matane Maboroshi.lrc",
			},
			{
				name: "Minority Myakuraku",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/04. Minority Myakuraku.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/04. Minority Myakuraku.lrc",
			},
			{
				name: "Samayoi Yoi Ondo",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/05. Samayoi Yoi Ondo.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/Cover.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/05. Samayoi Yoi Ondo.lrc",
			},
			{
				name: "Mabushii DNA Dake",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Mabushii DNA Dake.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Mabushii DNA Dake.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Mabushii DNA Dake.lrc",
			},
			{
				name: "Seigi",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Seigi.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Seigi.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Seigi.lrc",
			},
			{
				name: "Can't Be Right",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Can't Be Right.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Can't Be Right.png",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Can't Be Right.lrc",
			},
		],
	},
};
