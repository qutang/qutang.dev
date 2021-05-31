import githubClient from "$lib/api/github";

const posts_per_page = 100;

const PROJECTS = [
  {
    'owner': 'mHealthGroup',
    'repo': 'MIMSunit',
    'path': null,
    'name': {
      "en": 'MIMSunit: An open-source algorithm to compute movement summary from accelerometer',
      "cn": 'MIMSunit: 一种基于加速度计的计算运动总量的开源算法'
    },
    'official': 'https://mhealthgroup.github.io/MIMSunit/',
    'desc': {
      "en": 'MIMS-unit is abbreviated for Monitor Independent Movement Summary unit. This measurement is developed to harmonize the processing of accelerometer data from different devices.',
      "cn": 'MIMS-unit指Monitor Independent Movement Summary unit. 这种算法旨在提供一种跨设备的加速度计数据处理和归总算法。'
    },
    'tags': {
      "en": ['R', 'Open source', 'Algorithm', 'Mobile health'],
      "cn": ['R', '开源', '算法', '移动健康']
    }
  },
  {
    'owner': 'qutang',
    'repo': 'MUSS',
    'path': null,
    'name': {
      'en': 'Posture and Physical Activity Detection: Impact of Number of Sensors and Feature Type',
      'cn': '人体姿态和运动监测：不同传感器数目位置以及不同特征的影响研究。'
    },
    'official': null,
    'desc': {
      'en': 'In this project, we evaluated the effect of single-site versus multisite motion sensing at seven body locations (both ankles, wrists, hips, and dominant thigh) on the detection of physical behavior recognition using a machine learning algorithm.',
      'cn': '本研究旨在定量分析单一或者多个可穿戴传感器对于监测人体姿态和运动的不同影响。'
    },
    'tags': {
      'en': ['Python', 'Open source', 'Algorithm', 'Dataset', 'Mobile health', 'Machine learning'],
      'cn': ['Python', '开源', '算法', '数据集', '移动健康', '机器学习']
    }
  },
  {
    'owner': 'crowdgames',
    'repo': 'signaligner-web',
    'path': 'index.md',
    'name': {
      'en': 'Signaligner Pro: A professional mobile sensor data visualization, annotation tool',
      'cn': 'Signaligner Pro: 一种专业的移动传感器数据可视化以及标注工具'
    },
    'official': 'https://signaligner.org',
    'desc': {
      'en': 'Signaligner Pro is an interactive tool for algorithm-assisted exploration and annotation of raw accelerometer data. The tool can be used by researchers using raw accelerometer data to support research in activity recognition/machine learning, exercise science, and sleep quality research among others.',
      'cn': 'Signaligner Pro是一种可视化交互工具。它支持算法辅助的数据探索以及数据标注。该工具能够帮助研究人员直观地探索高频可穿戴传感器数据，相比其他工具，它有优良的交互性和速度，能够支持交互探索长时间巨量的传感器数据。'
    },
    'tags': {
      'en': ['JavaScript', 'Python', 'Software', 'Mobile health'],
      'cn': ['JavaScript', 'Python', '软件', '移动健康']
    }
  },
  {
    'owner': 'qutang',
    'repo': 'stereotypy_ubicomp_14',
    'path': null,
    'name': {
      'en': 'Detect stereotypical motor movements in individuals on the autism spectrum using wireless accelerometry',
      'cn': '使用无线可穿戴加速度计来监测自闭症患者的刻板化动作'
    },
    'official': 'https://docs.google.com/document/d/12cjQ6QPVeTjPgOZZtoWGJ0Wqh9KEk20LOLi3qEW17D4/edit#',
    'desc': {
      'en': 'This paper describes an algorithm that automatically detects stereotypical motor movements (SMM) in individuals on the autism spectrum using three-axis accelerometer data obtained through wearable wireless sensors.',
      'cn': '本项目旨在开发一种基于可穿戴加速度计的机器学习算法来自动监测自闭症患者的刻板化动作。'
    },
    'tags': {
      'en': ['R', 'MATLAB', 'Open source', 'Algorithm', 'Dataset', 'Mobile health', "Machine learning"],
      'cn': ['R', 'MATLAB', '开源', '算法', '数据集', '移动健康', '机器学习']
    }
  },
  {
    'owner': 'qutang',
    'repo': 'tang_pervhealth_14',
    'path': null,
    'name': {
      'en': 'Automated Detection of Puffing and Smoking with Wrist Accelerometers',
      'cn': '使用可穿戴加速度计来监测吸烟动作和行为'
    },
    'official': null,
    'desc': {
      'en': 'This project aims to detect puffing and smoking behavior in a real-world real-time or near-real-time setting with single or multiple on-body accelerometers.',
      'cn': '本项目旨在开发一种实时的基于可穿戴加速度计的机器学习算法来监测吸烟动作和行为。'
    },
    'tags': {
      'en': ['Python', 'Open source', 'Algorithm', 'Dataset', 'Mobile health', 'Machine learning'],
      'cn': ['Python', '开源', '算法', '数据集', '移动健康', '机器学习']
    }
  },
  {
    'owner': 'qutang',
    'repo': 'tower-airdrop',
    'path': null,
    'name': {
      'en': 'Tower Airdrop: An Android Experimental Exergame for Kids to Motivate and Keep Them Sweater',
      'cn': 'Tower Airdrop: 一个基于安卓的儿童实验性运动体感游戏'
    },
    'official': null,
    'desc': {
      'en': 'The game incorporates simple motion primitives such as moving/shaking, tilting and touch gestures into different game tasks: triggering parachute, avoiding obstacles, and stacking a tower. The Game paces are designed to fit the focus attention of kids.',
      'cn': '这个实验性游戏将人类的基础动作（比如移动、晃动、倾斜）融入不同的游戏任务中，使用智能手机自带的传感器来感应相应动作。该实验项目旨在通过游戏的方式促进儿童的运动意愿。'
    },
    'tags': {
      'en': ['Android', 'Open source', 'Game', 'Mobile health'],
      'cn': ['安卓', '开源', '游戏', '移动健康']
    }
  }
]

let paginate = function (post, index) {
  let page = Math.floor(index / posts_per_page) + 1;
  post["page"] = page.toString();
  return post;
};

let get_total_pages = async function (posts) {
  let pages = await posts.map((post) => post.page);
  let totalPages = await Math.max(...pages);
  return totalPages;
};

let get_projects = async function (repo) {
  let githubProjects = await githubClient.getProjects(PROJECTS);
  if (repo !== undefined) {
    githubProjects = await githubProjects.filter((proj) => proj.repo == repo);
  }
  githubProjects = await githubProjects.map(paginate)
  let totalPages = await get_total_pages(githubProjects);
  return { projects: githubProjects, totalPages: totalPages };
};

export { get_projects };

