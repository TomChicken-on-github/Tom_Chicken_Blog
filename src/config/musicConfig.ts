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
	playMode: "random",

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
				cover: "/assets/music/cover/ZUTOMAYO/01. Byoushinwo Kamu.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Byoushinwo Kamu.lrc",
			},
			{
				name: "Humanoid",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2018/09. Humanoid.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2018/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2018/09. Humanoid.lrc",
			},
			{
				name: "Nouriueno Cracker",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Nouriueno Cracker.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Nouriueno Cracker.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Nouriueno Cracker.lrc",
			},
			{
				name: "Saturn",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/03. Saturn.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/03. Saturn.lrc",
			},
			{
				name: "Uni To Kuri",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/04. Uni To Kuri.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/04. Uni To Kuri.lrc",
			},
			{
				name: "Kimigaite Mizuninaru",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/06. Kimigaite Mizuninaru.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Tadashii Itsuwarikarano Kishou - EP - 2018/06. Kimigaite Mizuninaru.lrc",
			},
			{
				name: "Inemuri Enseitai",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/03. Inemuri Enseitai.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/03. Inemuri Enseitai.lrc",
			},
			{
				name: "Haze Haseru Haterumade",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/04. Haze Haseru Haterumade.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/04. Haze Haseru Haterumade.lrc",
			},
			{
				name: "Kettobashita Moufu",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/05. Kettobashita Moufu.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/05. Kettobashita Moufu.lrc",
			},
			{
				name: "Dear. Mr_F_",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/06. Dear. Mr_F_.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/06. Dear. Mr_F_.lrc",
			},
			{
				name: "Konnakoto Soudou",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/07. Konnakoto Soudou.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/07. Konnakoto Soudou.lrc",
			},
			{
				name: "Glass to Rum Raisin",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/10. Glass to Rum Raisin.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/10. Glass to Rum Raisin.lrc",
			},
			{
				name: "Yasashiku Last Smile",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hisohiso Banashi - 2019/12. Yasashiku Last Smile.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Hisohiso Banashi - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hisohiso Banashi - 2019/12. Yasashiku Last Smile.lrc",
			},
			{
				name: "Kan Saete Kuyashiiwa",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/01. Kan Saete Kuyashiiwa.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/01. Kan Saete Kuyashiiwa.lrc",
			},
			{
				name: "Matane Maboroshi",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/03. Matane Maboroshi.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/03. Matane Maboroshi.lrc",
			},
			{
				name: "Minority Myakuraku",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/04. Minority Myakuraku.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/04. Minority Myakuraku.lrc",
			},
			{
				name: "Samayoi Yoi Ondo",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/05. Samayoi Yoi Ondo.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Imawa Imade Chikaiwa Emide - EP - 2019/05. Samayoi Yoi Ondo.lrc",
			},
			{
				name: "Mabushii DNA Dake",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Mabushii DNA Dake.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Mabushii DNA Dake.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Mabushii DNA Dake.lrc",
			},
			{
				name: "Seigi",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Seigi.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Seigi.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Seigi.lrc",
			},
			{
				name: "Can't Be Right",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Can't Be Right.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Can't Be Right.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Can't Be Right.lrc",
			},
			{
				name: "Darken",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Darken.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Darken.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Darken.lrc",
			},
			{
				name: "Milabo",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Gusare - 2020/08. Milabo.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Gusare - 2020/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Gusare - 2020/08. Milabo.lrc",
			},
			{
				name: "Fastening",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Gusare - 2020/12. Fastening.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Gusare - 2020/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Gusare - 2020/12. Fastening.lrc",
			},
			{
				name: "JK Bomber",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hogarakana Hifutote Fufuku - EP - 2020/04. JK Bomber.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Hogarakana Hifutote Fufuku - EP - 2020/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hogarakana Hifutote Fufuku - EP - 2020/04. JK Bomber.lrc",
			},
			{
				name: "Marine Blue Garden",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Hogarakana Hifutote Fufuku - EP - 2020/05. Marine Blue Garden.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Hogarakana Hifutote Fufuku - EP - 2020/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Hogarakana Hifutote Fufuku - EP - 2020/05. Marine Blue Garden.lrc",
			},
			{
				name: "Hunch Gray",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Hunch Gray.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Hunch Gray.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Hunch Gray.lrc",
			},
			{
				name: "Obenkyou Shitoiteyo",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Obenkyou Shitoiteyo.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Obenkyou Shitoiteyo.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Obenkyou Shitoiteyo.lrc",
			},
			{
				name: "Byoushinwo Kamu (From The First Take)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Byoushinwo Kamu (From The First Take).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/01. Byoushinwo Kamu (From The First Take).webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Byoushinwo Kamu (From The First Take).lrc",
			},
			{
				name: "One's Mind",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Gusare - 2021/01. One's Mind.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Gusare - 2021/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Gusare - 2021/01. One's Mind.lrc",
			},
			{
				name: "Have A",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Gusare - 2021/05. Have A.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Gusare - 2021/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Gusare - 2021/05. Have A.lrc",
			},
			{
				name: "Engine Oil",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Gusare - 2021/06. Engine Oil.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Gusare - 2021/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Gusare - 2021/06. Engine Oil.lrc",
			},
			{
				name: "Loneliness",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Gusare - 2021/09. Loneliness.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Gusare - 2021/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Gusare - 2021/09. Loneliness.lrc",
			},
			{
				name: "Hypersomnia",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Gusare - 2021/11. Hypersomnia.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Gusare - 2021/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Gusare - 2021/11. Hypersomnia.lrc",
			},
			{
				name: "Inside Joke",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/03. Inside Joke.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/03. Inside Joke.lrc",
			},
			{
				name: "Neko Reset",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/04. Neko Reset.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/04. Neko Reset.lrc",
			},
			{
				name: "Stay Foolish",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/06. Stay Foolish.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2021/06. Stay Foolish.lrc",
			},
			{
				name: "Stay Foolish",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Stay Foolish.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Stay Foolish.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Stay Foolish.lrc",
			},
			{
				name: "Blush",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Blush.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Blush.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Blush.lrc",
			},
			{
				name: "Kira Killer (feat. Mori Calliope)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Kira Killer (feat. Mori Calliope).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/01. Kira Killer (feat. Mori Calliope).webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Kira Killer (feat. Mori Calliope).lrc",
			},
			{
				name: "Mirror Tune",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Mirror Tune.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Mirror Tune.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Mirror Tune.lrc",
			},
			{
				name: "Flow Different",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/01. Flow Different.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/01. Flow Different.lrc",
			},
			{
				name: "QUILT",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/02. QUILT.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/02. QUILT.lrc",
			},
			{
				name: "Kisumi at Midnight",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/05. Kisumi at Midnight.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Nobi Shigusa Korite Itomagoi - EP - 2022/05. Kisumi at Midnight.lrc",
			},
			{
				name: "Summer Slack",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Summer Slack.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Summer Slack.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Summer Slack.lrc",
			},
			{
				name: "Time Left",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Time Left.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Time Left.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Time Left.lrc",
			},
			{
				name: "Kisumi at Midnight",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/ZUTOMAYO - 2024 中国特别版 - 2022/12. Kisumi at Midnight.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/ZUTOMAYO - 2024 中国特别版 - 2022/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/ZUTOMAYO - 2024 中国特别版 - 2022/12. Kisumi at Midnight.lrc",
			},
			{
				name: "Hanaichi Monnme",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Jinkougaku - 2023/01. Hanaichi Monnme.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Jinkougaku - 2023/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Jinkougaku - 2023/01. Hanaichi Monnme.lrc",
			},
			{
				name: "Nareai Serve",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Jinkougaku - 2023/05. Nareai Serve.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Jinkougaku - 2023/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Jinkougaku - 2023/05. Nareai Serve.lrc",
			},
			{
				name: "Intrusion",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Jinkougaku - 2023/09. Intrusion.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Jinkougaku - 2023/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Jinkougaku - 2023/09. Intrusion.lrc",
			},
			{
				name: "Superficial Me",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Jinkougaku - 2023/13. Superficial Me.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/Jinkougaku - 2023/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Jinkougaku - 2023/13. Superficial Me.lrc",
			},
			{
				name: "Open HonkakuCyuukaHazimemashita (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/01. Open HonkakuCyuukaHazimemashita (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/01. Open HonkakuCyuukaHazimemashita (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "QUILT (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/02. QUILT (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/02. QUILT (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Konnakoto Soudou (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/03. Konnakoto Soudou (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/03. Konnakoto Soudou (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Blush (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/05. Blush (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/05. Blush (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Hanaichi Monnme (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/06. Hanaichi Monnme (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/06. Hanaichi Monnme (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Flow Different (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/08. Flow Different (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/08. Flow Different (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Blues in the Closet (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/10. Blues in the Closet (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/10. Blues in the Closet (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Haze Haseru Haterumade(AragaiHazefriedTeisyoku) [AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE]",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/11. Haze Haseru Haterumade(AragaiHazefriedTeisyoku) [AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE].m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/11. Haze Haseru Haterumade(AragaiHazefriedTeisyoku) [AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE].lrc",
			},
			{
				name: "80kounenno Tabi (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/12. 80kounenno Tabi (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/12. 80kounenno Tabi (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "NEO Chao Fan (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/15. NEO Chao Fan (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/15. NEO Chao Fan (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Engine Oil (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/16. Engine Oil (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/16. Engine Oil (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Minority Myakuraku (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/20. Minority Myakuraku (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/20. Minority Myakuraku (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Time Left (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/22. Time Left (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/22. Time Left (AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE).lrc",
			},
			{
				name: "Darken(Strong) [AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE]",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/28. Darken(Strong) [AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE].m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- - 2024/28. Darken(Strong) [AUTHENTIC CHINESE KISSA _Ai no Pegasus_ -SPICY DRAGON OF LOVE- 2024 _ LIVE].lrc",
			},
			{
				name: "Blues in the Closet",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Blues in the Closet.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Blues in the Closet.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Blues in the Closet.lrc",
			},
			{
				name: "Hippocampal Pain",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Hippocampal Pain.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Hippocampal Pain.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Hippocampal Pain.lrc",
			},
			{
				name: "TAIDADA",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2024/04. TAIDADA.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2024/04. TAIDADA.lrc",
			},
			{
				name: "KOKE",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Koke no ichinen Kaiba ni takusu - EP - 2024/01. KOKE.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Koke no ichinen Kaiba ni takusu - EP - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Koke no ichinen Kaiba ni takusu - EP - 2024/01. KOKE.lrc",
			},
			{
				name: "KUZURI",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/Koke no ichinen Kaiba ni takusu - EP - 2024/03. KUZURI.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/Koke no ichinen Kaiba ni takusu - EP - 2024/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/Koke no ichinen Kaiba ni takusu - EP - 2024/03. KUZURI.lrc",
			},
			{
				name: "Truth In Lies",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Truth In Lies.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Truth In Lies.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Truth In Lies.lrc",
			},
			{
				name: "CREAM",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. CREAM.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. CREAM.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. CREAM.lrc",
			},
			{
				name: "Opening Ceremony, Please Stand (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/02. Opening Ceremony, Please Stand (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/02. Opening Ceremony, Please Stand (Live).lrc",
			},
			{
				name: "Byoushinwo Kamu (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/04. Byoushinwo Kamu (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/04. Byoushinwo Kamu (Live).lrc",
			},
			{
				name: "Time Left (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/09. Time Left (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/09. Time Left (Live).lrc",
			},
			{
				name: "Pain Give Form (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/10. Pain Give Form (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/10. Pain Give Form (Live).lrc",
			},
			{
				name: "Warmthaholic (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/14. Warmthaholic (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/14. Warmthaholic (Live).lrc",
			},
			{
				name: "TAIDADA (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/20. TAIDADA (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/20. TAIDADA (Live).lrc",
			},
			{
				name: "Darken (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/21. Darken (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/21. Darken (Live).lrc",
			},
			{
				name: "Inside Joke (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/23. Inside Joke (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/23. Inside Joke (Live).lrc",
			},
			{
				name: "Toboshii DNA Dake (Live)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/24. Toboshii DNA Dake (Live).m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/MIDNIGHT FOREVER EXPO ‘MEIKŌ WA GUNARUGA GOTOSHI’ (Live) - 2025/24. Toboshii DNA Dake (Live).lrc",
			},
			{
				name: "Pain Give Form",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Pain Give Form.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Pain Give Form.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Pain Give Form.lrc",
			},
			{
				name: "SHADE",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. SHADE.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. SHADE.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. SHADE.lrc",
			},
			{
				name: "Warmthaholic",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Warmthaholic.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Warmthaholic.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Warmthaholic.lrc",
			},
			{
				name: "Yushinron",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Yushinron.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Yushinron.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Yushinron.lrc",
			},
			{
				name: "Pain Give Form",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/ZUTOMAYO - 2026  Special Edition - 2025/04. Pain Give Form.m4a",
				cover:
					"/assets/music/cover/ZUTOMAYO/ZUTOMAYO - 2026  Special Edition - 2025/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/ZUTOMAYO - 2026  Special Edition - 2025/04. Pain Give Form.lrc",
			},
			{
				name: "Fig Smoke",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Fig Smoke.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Fig Smoke.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Fig Smoke.lrc",
			},
			{
				name: "This Planet Feels Fake",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2026/01. This Planet Feels Fake.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2026/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2026/01. This Planet Feels Fake.lrc",
			},
			{
				name: "Almost Human",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2026/02. Almost Human.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2026/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2026/02. Almost Human.lrc",
			},
			{
				name: "Kani Shabu Funk",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2026/05. Kani Shabu Funk.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2026/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2026/05. Kani Shabu Funk.lrc",
			},
			{
				name: "CREAM (Disco Re-Edit)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2026/07. CREAM (Disco Re-Edit).m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2026/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2026/07. CREAM (Disco Re-Edit).lrc",
			},
			{
				name: "ultra soul",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2026/11. ultra soul.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2026/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2026/11. ultra soul.lrc",
			},
			{
				name: "antimony",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2026/14. antimony.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2026/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2026/14. antimony.lrc",
			},
			{
				name: "yomosugara",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2026/15. yomosugara.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2026/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2026/15. yomosugara.lrc",
			},
			{
				name: "KUZURI (Live in Studio_Warm Storage)",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/KEISOUDO - 2026/16. KUZURI (Live in Studio_Warm Storage).m4a",
				cover: "/assets/music/cover/ZUTOMAYO/KEISOUDO - 2026/Cover.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/KEISOUDO - 2026/16. KUZURI (Live in Studio_Warm Storage).lrc",
			},
			{
				name: "Medianoche",
				artist: "ずっと真夜中でいいのに。",
				url: "/assets/music/song/ZUTOMAYO/01. Medianoche.m4a",
				cover: "/assets/music/cover/ZUTOMAYO/01. Medianoche.webp",
				lrc: "/assets/music/lrc/ZUTOMAYO/01. Medianoche.lrc",
			},
		],
	},
};
