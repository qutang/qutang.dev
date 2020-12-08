import githubClient from "../../_plugins/github";

const posts_per_page = 6;

const PROJECTS = [
  {
    'owner': 'mHealthGroup',
    'repo': 'MIMSunit',
    'path': null,
    'name': 'MIMSunit: An open-source algorithm to compute movement summary from accelerometer',
    'official': 'https://mhealthgroup.github.io/MIMSunit/',
    'desc': 'MIMS-unit is abbreviated for Monitor Independent Movement Summary unit. This measurement is developed to harmonize the processing of accelerometer data from different devices.',
    'tags': ['R', 'Open source', 'Algorithm', 'Mobile health']
  },
  {
    'owner': 'qutang',
    'repo': 'MUSS',
    'path': null,
    'name': 'Posture and Physical Activity Detection: Impact of Number of Sensors and Feature Type',
    'official': null,
    'desc': 'In this project, we evaluated the effect of single-site versus multisite motion sensing at seven body locations (both ankles, wrists, hips, and dominant thigh) on the detection of physical behavior recognition using a machine learning algorithm.',
    'tags': ['Python', 'Open source', 'Algorithm', 'Dataset', 'Mobile health']
  },
  {
    'owner': 'crowdgames',
    'repo': 'signaligner',
    'path': 'docs/index.md',
    'name': 'Signaligner Pro: A professional mobile sensor data visualization, annotation tool',
    'official': 'https://crowdgames.github.io/signaligner/',
    'desc': 'Signaligner-Pro is an interactive tool for algorithm-assisted exploration and annotation of raw accelerometer data. The tool can be used by researchers using raw accelerometer data to support research in activity recognition/machine learning, exercise science, and sleep quality research among others.',
    'tags': ['JavaScript', 'Python', 'Software', 'Web', 'Mobile health']
  },
  {
    'owner': 'qutang',
    'repo': 'stereotypy_ubicomp_14',
    'path': null,
    'name': 'Detect stereotypical motor movements in individuals on the autism spectrum using wireless accelerometry',
    'official': 'https://docs.google.com/document/d/12cjQ6QPVeTjPgOZZtoWGJ0Wqh9KEk20LOLi3qEW17D4/edit#',
    'desc': 'This paper describes an algorithm that automatically detects stereotypical motor movements (SMM) in individuals on the autism spectrum using three-axis accelerometer data obtained through wearable wireless sensors.',
    'tags': ['Python', 'Open source', 'Algorithm', 'Dataset', 'Mobile health']
  },
  {
    'owner': 'qutang',
    'repo': 'tang_pervhealth_14',
    'path': null,
    'name': 'Automated Detection of Puffing and Smoking with Wrist Accelerometers',
    'official': null,
    'desc': 'This project aims to detect puffing and smoking behavior in a real-world real-time or near-real-time setting with single or multiple on-body accelerometers.',
    'tags': ['Python', 'Open source', 'Algorithm', 'Dataset', 'Mobile health']
  },
  {
    'owner': 'qutang',
    'repo': 'tower-airdrop',
    'path': null,
    'name': 'Tower Airdrop: An Android Experimental Exergame for Kids to Motivate and Keep Them Sweater',
    'official': null,
    'desc': 'The game incorporates simple motion primitives such as moving/shaking, tilting and touch gestures into different game tasks: triggering parachute, avoiding obstacles, and stacking a tower. The Game paces are designed to fit the focus attention of kids.',
    'tags': ['Android', 'Open source', 'Game', 'Mobile health']
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

