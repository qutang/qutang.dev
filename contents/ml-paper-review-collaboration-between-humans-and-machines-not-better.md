---
title: "人借助机器学习并不一定能做出更好的决策？"
date: "2019-10-17T10:26:00"
series: "ml"
excerpt: "Human centric AI里很重要的一个话题就是探索人与机器的协作关系。其中人在机器学习的帮助或影响下的决策过程更是研究的重点。虽然很多论文展示出机器学习能够帮助人更好地做决策，但是也有不同的声音认为因为很多因素，一个好的机器学习模型并不一定能显著帮助人们改善他们的决策水平。Michelle Vaccaro和Jim Waldo就在The effects of mixing machine learning and human judgement一文中对这个问题进行了探讨。本文旨在总结这篇论文的知识点并说说自己的一些看法。"
---

## 背景：人与机器在决策里的协同效应

Human centric AI 里很重要的一个话题就是探索人与机器的协作关系。其中人在机器学习的帮助或影响下的决策过程更是研究的重点。虽然很多论文展示出机器学习能够帮助人更好地做决策，但是也有不同的声音认为因为很多因素，一个好的机器学习模型并不一定能显著帮助人们改善他们的决策水平。Michelle Vaccaro 和 Jim Waldo 就在[The effects of mixing machine learning and human judgement](https://queue.acm.org/detail.cfm?id=3363293)一文中对这个问题进行了探讨。本文旨在总结这篇论文的知识点并说说自己的一些看法。

> Researchers explain this phenomenon by emphasizing that humans and machines excel in different dimensions of intelligence[^1]. Human chess players do well with long-term chess strategies, but they perform poorly at assessing the millions of possible configurations of pieces. The opposite holds for machines. People also view this form of collaboration between humans and machines as a possible way to mitigate the problems of bias in machine learning, a problem that has taken center stage in recent months[^2].

业界认为人之所以可以和机器学习模型产生协同效应，是因为人跟机器在决策机制上是互补的。举例来说，人更善于做中长期的规划，更有大局观，而机器更善于在海量联系或者可能性中进行筛选。不过最近的机器学习进展表明机器也越来越能在时间维度上具有大局观（以 Deep reinforcement learning 为代表，详见[AlphaGo](https://deepmind.com/blog/article/alphago-zero-starting-scratch)模型里的大局观决策）。

另一方面，业界认为人的干预有助于缓解机器学习模型带来的偏见，这种人对机器学习的偏见的干预效果是显而易见的。机器学习模型的偏见的一个典型案例就是前几年的[微软小冰的种族主义](https://www.theverge.com/2016/3/24/11297050/tay-microsoft-chatbot-racist)言论事件了（我个人认为这的确说明了人类是一种充满偏见的生物，以及 twitter 真的跟微博一样是个垃圾场）。

## 研究方法：通过对比实验研究人与机器在风险管理的量化决策里的协作效果以及影响因素

> We decided to investigate this type of collaboration between humans and machines using risk-assessment algorithms as a case study. In particular, we looked at the COMPAS (Correctional Offender Management Profiling for Alternative Sanctions) algorithm, a well-known (perhaps infamous) risk-prediction system, and its effect on human decisions about risk. Many state courts use algorithms such as COMPAS to predict defendants' risk of recidivism, and these results inform bail, sentencing, and parole decisions.

[COMPAS](<https://en.wikipedia.org/wiki/COMPAS_(software)>)这个鬼玩意儿是 2015 年开发的一款旨在通过罪犯特征预测他们再次犯罪可能性的软件。听上去就已经很惊悚了对吧。业界把它叫做风险管理，但是你也可以把它叫少数派报告。关键是这套系统已经被联邦或者州法庭（美国）应用到给罪犯量刑或者保释上了。然后我们来看看它用的公式，

> Violent Recidivism Risk Score = (age∗−w)+(age-at-first-arrest∗−w)+(history of violence∗w) + (vocation education ∗ w) + (history of noncompliance ∗ w)
>
> where w is weight, the size of which is "determined by the strength of the item’s relationship to person offense recidivism that we observed in our study data".

说白了，它就是个关于五个变量的线性模型。听上去好像有点草率，但是好像确实有那么点用。另外值得注意的是这个公式没有包含关于种族或者性别的变量。

1. 年龄
2. 第一次被捕的年龄
3. 犯罪年限
4. 教育程度
5. 违法年限

作者认为人借助 COMPAS 并不能更好地决定一个人的再犯风险，但是并不表示 COMPAS 这个系统本身没用，实际上它的决策水平和人类相当[^3]。这里一定要清楚，本文研究的是人是否能在机器学习的帮助下，更好地对风险管理的问题作出决策。不同领域，机器学习的作用可以有很大差别。

## 结论分析一：实验设计可能并没有发挥模型优势

> Our work, consisting of two experiments, therefore first explores the influence of algorithmic risk assessments on human decision-making and finds that providing the algorithm's predictions does not significantly affect human assessments of recidivism.

作者这里归纳了本文的结论。第一个实验揭示了 COMPAS 没有帮助，第二个实验揭示了 COMPAS 不仅没帮助，还可能对人类决策带来认知偏差。我们先讨论一下第一个实验的设计。

> On the one hand, when algorithms and humans make sufficiently similar decisions their collaboration does not achieve improved outcomes.

作者认为在此类协作上，机器学习算法并没有提供与人类决策思路互补的智能。这个问题我觉得是也不是，一方面，如果机器学习是用人类难以理解的方式进行决策，那么人类就不一定能信任它。另一方面，如果机器学习用了与人类思维方法类似的模式进行决策，那么人类可能不太需要它，尤其这种没有几个变量的问题。尤其对于这种重要，无法重现或者试错的不完全信息决策（不像围棋），很难相信人类能完全信任一个模型。

> "The defendant is a [RACE][sex] aged [AGE]. They have been charged with: [CRIME CHARGE]. This crime is classified as a [CRIMINAL DEGREE]. They have been convicted of [NON-JUVENILE PRIOR COUNT] prior crimes. They have [JUVENILE-FELONY COUNT] juvenile felony charges and [JUVENILE-MISDEMEANOR COUNT] juvenile misdemeanor charges on their record."

_作者把上面的模板提供给人类做决策，这个模板本身已经是高度优化过了。所以我个人认为这个实验本身，可能并没有实在发挥出机器学习筛选海量数据的长处。我觉得更合理的对比可能是给人类一千个关于这个罪犯的行为特征，然后让人类进行决策，然后机器学习能够通过海量数据筛选出最关键的几个特征，这个时候，机器学习的作用可能就能体现出来了。另一方面，机器学习的作用可能不仅仅体现在最终的得分预测上，提取重要特征以供人类决策本身，也应被看作机器学习模型的帮助。_

## 结论分析二：人与机器协作里的锚定效应

> The follow-up experiment, however, demonstrates that algorithmic risk scores act as anchors that induce a cognitive bias: If we change the risk prediction made by the algorithm, participants assimilate their predictions to the algorithm's score.

这是第二个实验，结果揭示出机器学习模型的结果可能对人的认知产生锚定效应(anchoring effect)[^4]。*锚定效应是指在不确定的情况下，如果提供了参考，人在决策时通常会趋于保守，不愿意做出远离参考值的决策。*所以如果给出的参考值不精确，或者有迷惑性，人在决策时会产生认知偏差(cognitive bias)。我个人认为这个实验结论具有重要价值，在机器学习的应用设计上，应该考虑模型输出对人类行为的锚定效应。

> On the other hand, when algorithms fail, humans may not be able to compensate for their errors. Even if algorithms do not officially make decisions, they anchor human decisions in serious ways.

作者认为这个结论还揭示出当模型犯错时，人类可能并没有足够的认知去纠正这种错误，特指开放性的决策类的错误。与一般的计算机视觉，自然语言处理问题不同，这类决策问题通常没有固定的答案，而只有决策的可能的优劣。

[^1]: Goldstein, I. M., Lawrence, J., Miner, A. S. 2017. Human-machine collaboration in cancer and beyond: the Centaur Care Model. JAMA Oncology 3(10), 1303.

[^2]: Johnson, R. C. 2018. Overcoming AI bias with AI fairness. Communications of the ACM (December 6).

[^3]: Dressel, J., Farid, H. 2018. The accuracy, fairness, and limits of predicting recidivism. Science Advances 4(1), eaao5580.

[^4]: Tversky, A., Kahneman, D. 1974. Judgment under uncertainty: heuristics and biases. Science 185(4157), 1124—1131.
