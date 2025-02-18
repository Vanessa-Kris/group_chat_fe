import topicsData from '../data/topics.json';
import postsData from '../data/posts.json';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const generateRandomName = () => {
  const names = ['Foxy', 'Bear', 'Red', 'Violet', 'Musk', 'Purple', 'Birdie', 'Ant', 'Panda', 'Tiger'];
  return names[Math.floor(Math.random() * names.length)];
};

const generateRandomAvatar = () => {
  const seed = Math.floor(Math.random() * 10000);
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
};

const getRandomColor = () => {
  const colors = ["#1B4079", "#3A2E39", "#1E555C", "#7209B7", "#4A314D", "#035E7B", "#001C55", "#002E2C"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getMixedTopicsAndPosts = () => {
  let topics = shuffleArray(topicsData.map(topic => ({
    ...topic,
    type: "topic",
    color: getRandomColor(),
    liked: false,
  })));

  let posts = shuffleArray(postsData.map(post => ({
    ...post,
    type: "post",
    name: generateRandomName(),
    avatar: generateRandomAvatar(),
    liked: false,
  })));

  const mixedFeed = [];
  
  while (topics.length || posts.length) {
    if (topics.length && Math.random() > 0.4) {
      mixedFeed.push(topics.shift());
    }
    if (posts.length && Math.random() > 0.2) {
      mixedFeed.push(posts.shift());
    }
  }

  return mixedFeed;
};
