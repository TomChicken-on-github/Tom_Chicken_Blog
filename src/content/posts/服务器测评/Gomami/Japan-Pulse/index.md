---
title: 服务器测评 - 🗻Gomami.JPN.Pulse
published: 2025-12-06    # 发布日期
description: 🗻Gomami - JPN.Pulse 服务器测评 六边形战士   # 显示在首页卡片
image: ./logo.svg       # 封面图路径（可选）
tags: [服务器, VPS, Gomami, 测评]     # 文章标签
category: 服务器测评       # 文章分类
draft: false             # false=发布, true=草稿（仅本地可见）
---

:::tip[观前提示]
本帖无任何 AFF 链接, 可放心食用, 所有评价皆为个人观点喵
测试机型: [`🗻JPN.Pulse.Mini`](https://gomami.io/store/jpn-pulse)
:::

:::note
我目前的自用机 流量采用单向计费 预算充足富哥无脑上直接毕业 ~~我用来沪日拉全球的~~

`Gomami` 这家就不必多说了 所有产品都是六边形战士 性能IO线路都很顶 一分钱一分货的硬道理摆在那

IP干净同时三网各自走自家精品:`CN2` `CMIN2` `9929` & `10099` 国际互联优秀 

即使是晚高峰带宽冗余也非常充裕 直接跑满起飞 甚至可以跑出超过其承诺的规格一截  还有 `600Gbps` 的防御 
:::



## 机器规格

> 补充: 电信去程走的是 `163PP`  也就是 `高QOS` 优先级的 `163` 
> 
> 体验上和 `CN2` 几乎没区别  部分地区 **可能** 比 `CN2` 强 **一点点**
>
> 流量单向计费(OUT)就很舒适 且上下行链路分离


- `AMD EPYC™ 7773X | AMD EPYC™ 7K83 · 3.5GHz`
- `2~8` vCPU
- Memory `2~16GB` 
- NVME SSD `40~80GB`
- Traffic `500~5000GB`
- Bandwidth`1~3Gbps`
- `CN2 GIA` & `CMIN2` & `9929` / `10099`
- 价格: `29~169` USD
- 下单页: https://gomami.io/store/jpn-pulse

## 💻基本信息
:::note
> ~~这 CPU 都可以开 MC 服了~~


可以给有一定并发量的网站做建站鸡
:::

```bash
Basic System Information:
---------------------------------
Uptime     : 0 days, 0 hours, 8 minutes
Processor  : AMD EPYC 7773X 64-Core Processor
CPU cores  : 2 @ 2199.998 MHz
AES-NI     : ✔ Enabled
VM-x/AMD-V : ✔ Enabled
RAM        : 3.8 GiB
Swap       : 1.5 GiB
Disk       : 41.0 GiB
Distro     : Debian GNU/Linux 12 (bookworm)
Kernel     : 6.12.38+deb13-amd64
VM Type    : STANDARD PC (I440FX + PIIX, 1996)
IPv4/IPv6  : ✔ Online / ❌ Offline

IPv4 Network Information:
---------------------------------
ISP        : Next Hop LLC
ASN        : AS36002 Next Hop LLC
Host       : GoMami Networks. LLC
Location   : Tokyo, Tokyo (13)
Country    : Japan

fio Disk Speed Tests (Mixed R/W 50/50) (Partition -):
---------------------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 255.97 MB/s  (63.9k) | 2.05 GB/s    (32.1k)
Write      | 256.65 MB/s  (64.1k) | 2.06 GB/s    (32.2k)
Total      | 512.62 MB/s (128.1k) | 4.12 GB/s    (64.3k)
           |                      |                     
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 4.20 GB/s     (8.2k) | 4.34 GB/s     (4.2k)
Write      | 4.42 GB/s     (8.6k) | 4.63 GB/s     (4.5k)
Total      | 8.63 GB/s    (16.8k) | 8.98 GB/s     (8.7k)

Geekbench 5 Benchmark Test:
---------------------------------
Test            | Value                         
                |                               
Single Core     | 1224                          
Multi Core      | 2382                          
Full Test       | https://browser.geekbench.com/v5/cpu/23945017

 SysBench CPU 测试 (Fast Mode, 1-Pass @ 5sec)
---------------------------------
 1 线程测试(单核)得分:          3651 Scores
 2 线程测试(多核)得分:          7282 Scores
 SysBench 内存测试 (Fast Mode, 1-Pass @ 5sec)
---------------------------------
 单线程读测试:          46754.58 MB/s
 单线程写测试:          26983.50 MB/s
```
## 🎬IP质量
:::note
> 不知道邻居在搞什么飞机送中后还能给拉回来把~~JP机原生解锁干到US原生了~~


> 还有下面Soptify测试的时候屏蔽了过几天又解锁了 非常的神秘

还算不错 如果你没有什么特殊 ( 比如 `tk 运营`之类的账号运营 ) 的话不用套落地
:::

 ![image](https://i.111666.best/image/iuViyAyj4Xnmqr6YbIufdt.webp)

## 🌐网络质量
:::note

它接了 `GSL` 就好玩了 众所周知日美 `GSL` 雷打不动在 `82~83 ms` 区间 而沪日 CN2 实测延迟大概在 `30~35 ms` 左右

加起来沪美理论最低 `113+ ms` 最高也不超过 `120 ms` 可以自己搓游戏加速器了( 比如 `hypixel` ) 

当然如果你是富哥你可以去拉个 沪日 `IEPL` 或 `IPLC` 可以再压低个 `4 ms`
:::

 ![image](https://i.111666.best/image/xAvCZnwG8twbuf3u2e94E9.webp)

## 📍回程路由
:::note
> ~~味大，无需多盐~~

全直连走各家精品 没什么好说的 夯
:::
 ![image](https://i.111666.best/image/qRZBcOzBZFOmVuFaiIStMz.webp)

