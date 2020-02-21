---
title: Automated Puffing and Smoking Detection
date: 2016-08-04T00:00:00
excerpt: >-
  A compelementary introduction for a published paper about an Activity
  recognition algorithm based on Random Forest to automatically detect puffing
  and smoking behavior using wrist accelerometers.
series: ml
---
A compelementary introduction for a published paper about an Activity recognition algorithm based on Random Forest to automatically detect
puffing and smoking behavior using wrist accelerometers.

This project is aiming to detect puffing and smoking behavior in a real-world real-time or near-real-time setting with single or multiple on-body accelerometers. Currently, I've published one main track conference paper for this project at PervasiveHealth. I'm now working on designing a real-time detection system and verifying the offline algorithm in a real-time environment setting, under the supervision of Professor Stephen Intille.<!--more-->

Please contact me through email if you have any question or are interested in this project.

This project page hosts some additional resources that are not included in the publication text and I think are very interesting to know. This includes an open sourced dataset package called _RealSmoking_ along with source codes used in the publication and some video demos to show the complexity of smoking behavior.

## Original Publications

---

Please scan through the paper before using the dataset and source codes so that you can better understand them. Please also kindly cite the original paper when publishing results that are derived from using this public dataset.

<ol>
  <li>
    <b>Tang, Q.</b>, Vidrine, D., Crowder, E., and Intille, S. 2014.
    <i>Automated Detection of Puffing and Smoking with Wrist Accelerometers</i>.
    8th International Conference on Pervasive Computing Technologies for
    Healthcare, ICST (2014).
    <a
      href="http://eudl.eu/doi/10.4108/icst.pervasivehealth.2014.254978"
      title="download paper"
    >
      Download paper
    </a>
  </li>
</ol>

## Documentation for RealSmoking dataset package

---

[View and download](https://qutang.gitbooks.io/documentation-real-world-puffing-and-smoking-data/content/)

<div className="spacing"></div>

## Demos: the complexity of smoking behavior in real world

---

These videos are shot to show the real world cases of smoking behavior. Videos and corresponding accelerometer signal are put side by side to give a direct impression of how movement could affect and intervene the underlying signal.

<br />
<div className='video-container'>
  <iframe className="center-block" width="400" height="250" src="//www.youtube.com/embed/0vuninozmh0" frameBorder="0" allowFullScreen align="center"></iframe>
</div>

**Separable concurrent activities**: In this video, tester was asked to perform smoking while walking. As you can see from the video, signal was shown to contain additive components from both hand movement (puffing) and body movement (walking). These two components are independent and additive because they are conducted by different body components. This gives us some inspiration when dealing with concurrent activities.

<br />
<div className='video-container'>
  <iframe className="center-block" width="400" height="250" src="//www.youtube.com/embed/9ariksf8jAk" frameBorder="0" allowFullScreen></iframe>
</div>

**Ambiguous hand gestures**: In this video, tester was asked to perform puffing, eating and drinking during smoking in a natural way. The signal contains several ups and downs but none of them shows distinguish characteristics only for puffing. In fact, these activites all belong to hand-to-mouse gestures. The differences between these activities are quite minor from the view of the signal. This exposes one of the chanllenges in activity recognition, which is to classify similar movements.

<br />
<div className='video-container'>
  <iframe className="center-block" width="400" height="250" src="//www.youtube.com/embed/FjhBPKOZ1a0" frameBorder="0" allowFullScreen></iframe>
</div>

**A comprehensive episode**: This video shows a comprehensive episode of natural smoking behavior including a series of complex activities ongoing at the same time. Signals, as shown on the right side, appear to be quite intervened and complex and lack of visible distinguish characteristics for each type of activities. The activites are changing relatively fast in time, thus makes them even more difficult to be captured and recognized in real time.

## Acknowledge

---

The project was originally partially funded by a start-up funds awarded to Dr. Vidrine from the University of Texas MD Anderson Cancer Center which led to the first paper published in 2014; the tools or sensors used were supported by National Heart, Lung and Blood Institute, National Institutes of Health award #5UO1HL091737.
