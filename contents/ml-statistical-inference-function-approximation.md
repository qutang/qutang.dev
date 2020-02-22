---
title: 统计推断和函数估计
type: post
date: '2019-08-19T16:51:00'
excerpt: 从statistical model和function approximation两个角度看待机器学习算法的问题。
series: ml
---

今天重读《The elements of statistical learning》第二章，作者提到从 statistical model 和 function approximation 两个角度看待机器学习算法的问题。前者更著名的书是 Kevin Murphy 的《Machine learning: From a probabilistic perspective》。

作者首先通过两类极端且简单的机器学习算法 Linear regression 以及 nearest neighbor model，来展示两类算法在统计模型和函数估计上结果的殊途同归，然后从统计推断和函数估计的角度出发，引出关于高维数据(high dimensional data)，本地近似估计，以及模型复杂度（bias-variance trade-off）的讨论。比如从统计模型来看，linear regression 模型代表了在每个给定输入数据下，产生真实数据点的高斯分布的期望；而从函数估计来看，linear regression 模型代表了在考虑全部输入数据的情况下，跟真实数据的 Sum-of-square-error(SSE)最小的数据点，见下图 a[^1]和图 b[^2]。


![Linear regression perspectives: (a) Statistical model; (b) Function approximation](media/uploads/lr_perspective.png)

我个人似乎更习惯从函数估计或者函数优化的角度来理解算法的推导，不过似乎可以通过更具象的函数空间和数据空间的角度来理解。不同算法的本质在于在数据空间上对本地数据（local samples）的不同处理，以及对各种隐藏属性的函数近似。Linear Regression 将整个数据空间当成本地，而 Nearest Neighbor 有一个限制的邻域。基本上所有算法（从决策树，支持向量机到神经网络）都能从这个角度来看，只是每个算法施加在目标函数上的限制不同。从函数估计角度，模型选择更多的是关于哪种函数能更好的模拟数据空间，比如是否高维，是否有隐藏变量，局部数据可以用哪种 kernel 来近似，选择的函数是否有连续性，奇点，方便通过数值计算优化，以及最优解。而从统计推断角度，模型选择更多的是关于哪种概率分布更适合代表数据空间，以及是否更容易得到最优化的解析解。在解释模型复杂度的思路上，bias-variance 理论却是通过统计推断得出，bias 描述了数据空间中真实数据和预测数据的平均偏差，而 variance 描述了数据空间中预测数据的方差。

也许在实际应用中，选择从哪个角度来建模需要从给定问题的限制条件来决定。统计推断在 generative model 上有着天然的优势，因为它直接阐明了数据产生的内在机理，完整地描述了实际应用中可能出现的各种结果的可能性以及导致这些结果的不同原因的可能性，这在另一个角度，其实更贴近于人类的决策过程。

[^1]: [The Principle of Maximum Likelihood](http://complx.me/2017-01-22-mle-linear-regression/)

[^2]: [Linear Regression](https://towardsdatascience.com/simple-linear-regression-2421076a5892)
