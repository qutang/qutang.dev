---
title: "黑盒模型的解释算法在高风险决策中也许并不恰当"
date: "2019-09-05T13:51:00"
series: "ml"
excerpt: "这是一篇Cythia Rudin写的论文'Please Stop Explaining Black Box Models for High-Stakes Decisions'的笔记摘要。这篇文章主要分析和归纳了那些用来解释黑盒模型的算法在高风险决策中的各种问题，在Deep learning占据主流的AI市场，算法的偏见，不公正和不透明性已经成为不可忽视的问题。在一些高风险决策中，这种不透明性可以是致命的，而任何解释黑盒模型的算法都有着自己的缺陷。"
---

这是一篇 Cythia Rudin 写的论文[Please Stop Explaining Black Box Models for
High-Stakes Decisions](https://arxiv.org/abs/1811.10154)的笔记摘要。这篇文章主要分析和归纳了那些用来解释黑盒模型的算法在高风险决策中的各种问题[^1]，在 Deep learning 占据主流的 AI 市场，算法的偏见，不公正和不透明性已经成为不可忽视的问题。在一些高风险决策中，这种不透明性可以是致命的，而任何解释黑盒模型的算法都有着自己的缺陷。

对我个人而言，提醒了我在看待一个新兴模型时，除了其看似神奇的应用场景，也应该对一个新模型的限制，先决条件，可能的不透明和偏见有清楚的认识。盲目应用 cut-edge 的新模型虽然容易吸引眼球，但往往不是最恰当和科学的方式。

## 真正的可理解模型的特点 (Interpretable machine learning)

> an interpretable
> machine learning model is constrained in model form so that it is either useful to someone, or
> obeys structural knowledge of the domain, such as monotonicity, causality,
> structural (generative) constraints, additivity, or physical constraints that come from
> domain knowledge.

1. 对于某类人(模型开发或者使用者或者用户)有用。这意味着模型的可理解性有程度之分，有些对于普通用户友好，这意味着模型具有很强的可理解性，比如简单的决策树(Decision tree)或者基于规则的模型(Rule-based)；有些对与专业人员友好，可理解性其次，比如线性(Linear model)或者泛化线性模型(Generalized linear model)；有些可能只对于极少的专业人员友好，可理解性最差，比如深度学习(Deep learning)。

2. 符合领域知识的基本规律。比如有些地质领域的机器学习模型依据地质学，物理学知识建模，模型更多承载的是一种总结经验学习的优化器的作用。这类模型的表现通常是符合地质学原理的，结果是可以被专业地址人员准确解读的。

> Sparsity is a useful measure of interpretability, since humans can handle
> at most 7 ± 2 cognitive entities at once[^2]. Sparse models allow a view of
> how variables interact jointly rather than individually

这里有一个很重要的结论：**普通人一般只能同时关注至多 7 ± 2 个因素。** 这个结论暗示了稀疏性(Sparsity)对于模型的重要性，稀疏性也常常作为标准之一来衡量模型的可理解性，比如经典稀疏模型 Lasso。稀疏性有利于用户关注对于模型最重要的少数几个变量。但是稀疏性并不总是好的，因为训练数据本身的偏差，一些变量的重要性可能被低估。如果模型的结果（本来假设重要的模型却被忽略）跟领域知识或者原理或者常识不一致时，需要保持足够的警惕。

## 黑盒模型解释算法的争议（Explanable machine learning）

注意 Interpretable 和 Expanable 的区别。

### 准确度和模型可理解性性的折中

> There is a widespread belief that more complex models are more accurate, meaning that a complicated
> black box is necessary for top predictive performance. However, this is often not true, particularly
> when the data naturally have a good representation.

1. 人们往往喜欢用更复杂更炫的复杂模型，因为内心倾向于认为它们会有更好的表现。一个经典例子就是不久前引起争论的 Google 发表的[预测地震模式的深度学习模型](https://www.nature.com/articles/s41586-018-0438-y)，以及社区发表的[不同意见](https://towardsdatascience.com/stand-up-for-best-practices-8a8433d3e0e8)，认为这有滥用深度学习的嫌疑。

2. 在很多应用场景中，只要采用正确的数据收集，数据预处理以及特征工程，复杂模型或者更简单的可理解性模型的表现差别不大，但是后者可以提供非常重要的可理解性。

### 这些解释算法不能完全客观反映原始模型

我本来希望作者可以分析几个具体的算法。可是好像。。。并没有。不过作者的逻辑有一丢丢道理。它说这些解释算法不可能百分之百还原原始模型，不然就可以直接取代原始模型了。最近流行的解释算法比如 Lime，是 instance-based，确实没有试图去取代原始模型。所以作者认为这些论文不应该轻易使用 Explanation 这个词，因为 Explanation 表明我通过这个算法明白之前那个模型究竟在干什么，以及怎么干的了。但实际上确实并不能，也不可能可以，因为它就是个黑盒，你很难通过结果倒推出一模一样的特征。引用一句俗话，这个世界上，长得像的两片叶子确实太多了，但是一样的不可能有呀。我蛮同意作者这种认知的，毕竟现在已经有了一种炒概念，terminology 的趋势。作者认为这样的算法，应该更准确地叫 summaries of predictions。

### 这些解释算法提供的解释聊胜于无

作者认为有些解释算法解释了相关性，但是却并没有解释这种相关性的重要性。这确实是个问题，但我个人认为是在慢慢进步的。现在很多新的模型已经可以提供更多信息了。其实说到底，人们想知道的是这个模型的表现符不符合基本自然规律和常识。很多用对抗**样本分析**深度学习的模型已经表现出以前一些模型并不十分符合常识，所以很容易被欺骗。

## 可理解模型的缺陷

Emmmmm...这段我就不多说了，因为没什么技术性的东西。主要就是抱怨业界，公司对于滥用技术的警惕性不够，一切以名利为导向。然后说了一下可理解模型的构建通常需要很多专业知识，这跟 AutoML 的理念比较不一样。

## 可理解模型的挑战

因为作者是搞可理解模型的，所以这段才是干活。

### 最优逻辑模型

逻辑模型是常见的可理解模型，因为都是 and, not, or, if then 和 if else 嘛。一般这种模型都是 Rule-based 和手动创建的，所以寻找最优的模型构建一直是个问题。

这个问题可以归纳为怎么通过这类逻辑语句构建一个尽可能简化的逻辑图，拥有尽可能少的分支条件。决策树就是这种模型。通常这种模型都是通过贪婪或者遗传算法来优化，并不是很在乎全局最优解。

### 最优稀疏评分模型

评分系统 Scoring 其实真的蛮有意思的。这个系统的一个“经典”例子就是“你男朋友到底有多爱你？”，买礼物+1，吵架-1，不接电话-1，长得帅+5，然后最后通过这一系列表现估计一下他到底有多爱你。你在网上爬虫了 1 万个人关于她们男票的这类评价（通常不是量化的，只有正面 1，负面-1，或者没有评价 0），总共有大概 1000 个变量，以及相应的他们到底爱不爱的 ground truth (1, 0)。现在你想知道究竟每一项需要加多少分？？？？？？？？，或者说占多少比重，才能准确估计你男票有多爱你的程度，一个 0-1 之间的值。

👏👏👏👏👏👏👏

然后你建立了一个简单的稀疏线性模型来寻找答案。目标函数有两个因素，一个是总分的 logistic regression 表达式，因为结果是 0 或者 1 嘛，一个是非零变量总数，用来控制稀疏性。毕竟你不可能同时关注这一千个变量。现在你要优化它了。麻烦来了，你为了让结果看起来更通俗易懂，认为限制每个变量的得分必须是在-10 到 10 之间的整数。嗯，这就对了，作者认为这种模型很难优化。

### 定义可理解性

作者认为不同领域对可理解性的定义不同。对于上面的例子，线性模型的稀疏性决定了它的可理解程度。但是对于计算机视觉，可理解程度的定义却不能用稀疏性来评价。作者认为这需要与认知科学相结合。

作者提到了一篇关于计算机视觉的可理解神经网络的论文，蛮有意思[^3]。

[^1]: Michael McGough. How bad is sacramento’s air, exactly? google results appear at odds with reality, some say. Sacramento Bee, 2018. URL: https://www.sacbee.com/news/state/california/fires/article216227775.html.

[^2]: Nelson Cowan. The magical mystery four how is working memory capacity limited, and why? Current directions in psychological science, 19(1):51–57, 2010.

[^3]: Oscar Li, Hao Liu, Chaofan Chen, and Cynthia Rudin. Deep learning for case-based reasoning through prototypes: A neural network that explains its predictions. In Proceedings of AAAI, 2018.