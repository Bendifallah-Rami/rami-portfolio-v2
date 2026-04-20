export const getTrainingImages = (item) => {
  if (Array.isArray(item?.images) && item.images.length > 0) return item.images;
  if (typeof item?.image === 'string' && item.image.length > 0) return [item.image];
  return [];
};

export const getPrimaryTrainingImage = (item) => getTrainingImages(item)[0] ?? '/logo.png';

export const trainingItems = [
  {
    title: 'Pascal Training for First-Year ESI Students',
    period: 'CSE Event',
    description:
      'Delivered foundational Pascal training for first-year students at ESI as part of a CSE event.',
    icon: 'GraduationCap',
    images: ['/logo.png', '/csewebsite/Copilot_20260420_152836.png'],
    image: '/logo.png',
    points: [
      'Taught Pascal basics, syntax, and problem-solving approach',
      'Guided first-year students through core programming exercises',
      'Session delivered within CSE activities',
    ],
  },
  {
    title: 'DevSprint Frontend Training (React.js & Next.js)',
    period: 'CSE - DevSprint Event',
    description:
      'Trained participants in building modern frontend applications with React.js and Next.js during DevSprint.',
    icon: 'Code2',
    images: ['/portfolio.png', '/fooddelivery/foodDelivery.png', '/esiflow/esiflow.png'],
    image: '/portfolio.png',
    points: [
      'Covered component-based architecture and routing patterns',
      'Explained state management and reusable UI practices',
      'Session delivered within CSE activities',
    ],
  },
  {
    title: 'Node.js & Express Training (2 Sessions)',
    period: 'CSE Event',
    description:
      'Conducted two dedicated training sessions on backend development using Node.js and Express.',
    icon: 'Database',
    images: ['/quiz.png', '/esiflow/esiflow.png'],
    image: '/quiz.png',
    points: [
      'Built REST API structure with Express.js',
      'Explained middleware, routing, and controller patterns',
      'Both sessions delivered within CSE activities',
    ],
  },
  {
    title: 'CAA Web Fundamentals Training (HTML, CSS, JS)',
    period: 'CSE - CAA Event',
    description:
      'Delivered a CAA training focused on web foundations: HTML, CSS, and JavaScript.',
    icon: 'Code2',
    images: ['/caa3/Gemini_Generated_Image_6ncykr6ncykr6ncy.png', '/image.png'],
    image: '/caa3/Gemini_Generated_Image_6ncykr6ncykr6ncy.png',
    points: [
      'Introduced semantic HTML and modern CSS layout techniques',
      'Covered JavaScript fundamentals for interactive pages',
      'Session delivered within CSE activities',
    ],
  },
  {
    title: 'CAA Workshop: Build Websites with AI',
    period: 'CSE - CAA Event',
    description:
      'Led another CAA session about how to build websites faster using AI tools and workflows.',
    icon: 'GraduationCap',
    images: ['/aluminate/Gemini_Generated_Image_jjo53yjjo53yjjo5%20(1).png', '/image.png'],
    image: '/aluminate/Gemini_Generated_Image_jjo53yjjo53yjjo5%20(1).png',
    points: [
      'Shared practical AI-assisted website planning and coding flow',
      'Demonstrated how to move from prompt to working UI quickly',
      'Session delivered within CSE activities',
    ],
  },
  {
    title: 'C Language Training',
    period: 'CSE Event',
    description:
      'Delivered training on C language fundamentals and problem-solving techniques.',
    icon: 'GraduationCap',
    images: ['/logo.png', '/esi101/Screenshot%202026-04-20%20150933.png'],
    image: '/logo.png',
    points: [
      'Covered data types, control flow, functions, and arrays',
      'Guided students through algorithmic thinking in C',
      'Session delivered within CSE activities',
    ],
  },
  {
    title: 'Skills Boost Assistant Trainer (React & Next.js)',
    period: 'CSE - Skills Boost Event',
    description:
      'Supported the training team as an assistant trainer for React and Next.js in Skills Boost.',
    icon: 'Code2',
    images: ['/portfolio.png', '/organizers-app/Screenshot%202026-04-20%20081531.png'],
    image: '/portfolio.png',
    points: [
      'Helped participants during implementation and debugging sessions',
      'Assisted with React and Next.js project structure best practices',
      'Session delivered within CSE activities',
    ],
  },
];
