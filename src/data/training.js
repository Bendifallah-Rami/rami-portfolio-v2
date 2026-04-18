export const getTrainingImages = (item) => {
  if (Array.isArray(item?.images) && item.images.length > 0) return item.images;
  if (typeof item?.image === 'string' && item.image.length > 0) return [item.image];
  return [];
};

export const getPrimaryTrainingImage = (item) => getTrainingImages(item)[0] ?? '/logo.png';

export const trainingItems = [
  {
    title: 'Full-Stack Web Development Training',
    period: '2022 - Present',
    description:
      'Hands-on training focused on building complete web applications with modern frontend and backend stacks.',
    icon: 'GraduationCap',
    images: ['/portfolio.png', '/foodDelivery.png', '/quiz.png'],
    image: '/portfolio.png',
    points: [
      'Built scalable apps with Next.js and Node.js',
      'Implemented authentication and secure API workflows',
      'Practiced clean architecture and reusable components',
    ],
  },
  {
    title: 'Backend Systems & Database Engineering',
    period: '2023 - Present',
    description:
      'Advanced backend training for API design, performance optimization, and reliable database modeling.',
    icon: 'Database',
    images: ['/datahack.png', '/quiz.png'],
    image: '/datahack.png',
    points: [
      'Designed relational schemas and query strategies',
      'Built REST services with validation and error handling',
      'Improved performance through indexing and caching',
    ],
  },
  {
    title: 'Team Collaboration & Delivery Workflow',
    period: 'Ongoing',
    description:
      'Practical training in collaborative software delivery using Git workflows, reviews, and iterative releases.',
    icon: 'Code2',
    images: ['/esiflow.png', '/portfolio.png'],
    image: '/esiflow.png',
    points: [
      'Worked in collaborative Git branching workflows',
      'Shipped features in sprint-style iterations',
      'Followed code-review and quality-first practices',
    ],
  },
];
