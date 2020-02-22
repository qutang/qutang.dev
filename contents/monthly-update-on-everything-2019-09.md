---
title: 第一期：能够检测经血的卫生巾？？？
type: post
date: '2019-09-17 10:44:53'
excerpt: 'Ubicomp 2019，谷歌的隐私编码算法, 以及关于开题报告的无尽挑战。'
series: voyage
---
由于是第一期更这个系列，介绍下系列的初衷。

从小喜欢航海游戏或者这种类型的电影和动漫，比如海商王，大航海时代，加勒比海盗以及海贼王之类，对于作为航海士上船然后出海冒险有特别的痴迷。不过这种痴迷仅限于大航海时代，工业革命尚未开始的帆船时代。自从有了蒸汽机，卫星导航，无线电通讯，铁皮船以及半自动或者全自动的热兵器，越发觉得航海不再像是冒险了。

用航海当主题，是想要让自己的经历有些冒险感和刺激感。

这些日志分为三个板块，**瞭望台**分享个人新的发现和进展，**灯塔**分享重大的科技变迁以及个人的看法，**甲板**分享个人发展的心得体会。

![voyage](../media/uploads/voyage.jpg)

## 🔭 瞭望台

（缺一张好的图）

本月路过年度领域顶会 Ubicomp，在英国伦敦召开。花了一点时间把 keynote 和相关论文。。的摘要看了看。相关论文正文请复制然后自行搜索。

### 非核心论文

#### 喜欢的

* **Evolving Needs in IoT Control and Accountability: A Longitudinal Study on Smart Home Intelligibility**

  *简评：智能家居的可定制性对不同家庭的个性化需求非常重要。而这种个性化需求会随着时间变化。面向非专业用户的可 DIY 的智能家居系统设计是难点。本文的价值在于跟踪了 12 个用户两年的使用习惯，发现了用户需求的迁移，从初期面面俱到的 DIY，到仅仅关注”系统犯错”。个人觉得这个观察很符合常理。我的炒股经历告诉我，初期涨跌我都关注，后期除非是大涨或者大跌我统统不 care。*
* **micro-Stress EMA: A Passive Sensing Framework for Detecting in-the-wild Stress in Pregnant Mothers**

  *简评：老板喜欢的。因为 micro-EMA 就是我实验室最先搞出来的。这个技术潜力挺大的，尤其当智能手表越来越普及之后*
* **Your Table Can Be an Input Panel: Acoustic-based Device-Free Interaction Recognition**

  *简评：万物皆信号，只要有脑洞。敲桌子可能有点奇怪，但是拍拍手，打个响指还是可以的。*
* **Just-in-Time but Not Too Much: Determining Treatment Timing in Mobile Health**

  *简评：这篇文章提出的问题很核心，怎么设计恰好合适的“及时干预”。但是，这个 abstract 没让我看到太多新东西。它的核心是把干预平均地分配到所有时间上，这个。。。不是很不言而喻的事吗？但是这个问题确实是所有 mobile health 类应用的核心*
* **Interrupting Drivers for Interactions: Predicting Opportune Moments for In-vehicle Proactive Auditory-verbal Tasks**

  *简评：参考上篇，it's all about timing 时机很重要！*
* **How Does a Nation Walk?: Interpreting Large-Scale Step Count Activity with Weekly Streak Patterns**

  *简评：现在的问题确实是数据太多。这种 large scale 研究的特点就是方法简单，但是往往能得到最有用的结论。*

#### 不太喜欢的

* **Differentiating Higher and Lower Job Performers in the Workplace Using Mobile Sensing**

  *简评：看名字。。。emmmm？？？，前几天看新闻说有中学用人脸识别监控课堂表现，现在又来了用 mobile sensing 监控工作表现？最后一句话说是提供帮助，其实就是帮助老板开人吧！*
* **MenstruLoss: Sensor For Menstrual Blood Loss Monitoring**

  *简评：Ubicomp 果然是脑洞大会。本期热搜是关爱女性健康，从检测月经出血量开始。我仿佛看到了网红带货的黑科技卫生巾。不过。。。错误率居然有 30%这么高，这更像是营销号。*

### 核心论文

今年关于 Activity recognition 算法的论文主要关注点都在 annotation 的问题，这也侧面反应了数据标记是本领域的一大难点。

* **On the role of features in human activity recognition**

  *简评：这是一篇我需要阅读的文章，所以价值不言而喻。深度学习和传统机器学习在 Activity recognition 领域表现差别不大。深度学习并没有像在计算机视觉或者语音语言处理中那样，表现出巨大的优势。最近结束的 Sussex-Huawei Locomotion Dataset challenge 2019 的总结论文里也印证了类似的看法[^1]。究其原因，个人认为还是在 feature 的问题上，深度学习的一大特点就是多层特征的自动提取。按理说 activity recognition 跟语音之类的时域信号有那么点相似性，深度学习的表现不应该这么差才对。只能说可能运动信号都太低频，在短时间内基本上都是 non-stationary 的。*
* **Leveraging Active Learning and Conditional Mutual Information to Minimize Data Annotation in Human Activity Recognition**

  *简评：这篇文章被我实验室统一推荐为必读。我草草过了一遍，确实不错，有很详细的算法描述以及实验设计。最关键的是结果很振奋，通过筛选训练数据，可以只用 10%的数据达到使用完整数据集时的表现。从另一方也能说明实际上 activity recognition 的数据集里存在着大量的冗余数据。这跟我将要进行的实验不谋而合，一个基本假设是关于 walking，来自同一 episode 的数据并不需要很多，两三个应该就够了，关键在于提供足够丰富的 episode。这篇文章间接证实了这种假设。*
* **Handling annotation uncertainty in human activity recognition**

  *简评：我是真的不喜欢不直接在摘要里写到底模型表现提升了多少的论文的（差评+1）！但是鉴于本文说了个很重要的问题，就是数据标记时的标记和数据的时间戳经常出现错位。作者也不说到底用了什么方法解决这个问题（差评+1）。一般来说，我们通常都是掐头去尾去掉错位的部分，不过这种方法不能很好的解决短时间的动作，因为掐着掐着就没有数据了。*
* **Swimming style recognition and lap counting using a smartwatch and deep learning**

  *简评：我仿佛看到了下一代 apple watch 的卖点*
* **Estimating load positions of wearable devices based on difference in pulse wave arrival time**

  *简评：日本人的脑洞还是可以的。从直觉上讲，这的确可能是个蛮有效的检测传感器位置的方法。但是如果这东西没戴在皮肤表面咋办呢？？？？*

## ⛯ 灯塔

本月新闻不多，但是苹果的新品发布会确实赚足了眼球。在计算机科学领域，不得不提的是谷歌的[differential privacy](https://github.com/google/differential-privacy)算法。个人觉得谷歌开发这个算法的根本目的就是绕开欧盟的数据保护 GDPR 法案的监管。毕竟谷歌是以数据为生的公司呀。

苹果做产品的态度是真的值得学习，不跟风，以用户的核心体验为导向。技术方面，三摄像头的无缝流畅切换值得吹一波，希望国产厂商继续潜心修炼，尤其是被寄予众望的华为。

## ⚓ 甲板

无尽地。。。与。。。开题报告和老板博弈的过程中。。。

### 关于开题报告的些微进展

[^1]: L. Wang, H. Gjoreski, K. Murao, T. Okita, D. Roggen. “Summary of the Sussex-Huawei Locomotion-Transportation Recognition Challenge.” In Ubicomp Adjunct Proceedings. ACM, 2018.
