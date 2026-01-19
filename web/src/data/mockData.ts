export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorTitle: string;
  category: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  level: string;
  thumbnail: string;
  syllabus: string[];
  videoUrl: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

export interface Activity {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  type: 'assignment' | 'quiz' | 'project';
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Submission {
  id: string;
  studentName: string;
  courseName: string;
  assignmentTitle: string;
  submittedDate: string;
  status: 'pending' | 'graded';
  grade?: number;
}

export interface StudentGrade {
  id: string;
  courseId: string;
  courseName: string;
  assignmentTitle: string;
  type: 'assignment' | 'quiz' | 'project';
  grade: number;
  maxGrade: number;
  submittedDate: string;
  gradedDate: string;
  feedback?: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introdução ao Desenvolvimento Web',
    description: 'Aprenda os fundamentos do desenvolvimento web incluindo HTML, CSS e JavaScript. Perfeito para iniciantes.',
    instructor: 'Dra. Sarah Johnson',
    instructorTitle: 'Desenvolvedora Web Sênior e Educadora',
    category: 'Desenvolvimento Web',
    price: 49.99,
    rating: 4.8,
    students: 1234,
    duration: '8 semanas',
    level: 'Iniciante',
    thumbnail: 'web-development',
    syllabus: [
      'Introdução ao HTML5',
      'Estilização com CSS3',
      'Fundamentos de JavaScript',
      'Manipulação do DOM',
      'Construindo seu Primeiro Site',
      'Princípios de Design Responsivo',
      'Introdução a Frameworks',
      'Projeto Final'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    modules: [
      {
        id: 'm1',
        title: 'Começando',
        lessons: [
          { id: 'l1', title: 'Boas-vindas ao Curso', duration: '5:30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: true },
          { id: 'l2', title: 'Configurando seu Ambiente', duration: '12:45', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: true },
          { id: 'l3', title: 'Fundamentos de HTML', duration: '18:20', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false }
        ]
      },
      {
        id: 'm2',
        title: 'Fundamentos de CSS',
        lessons: [
          { id: 'l4', title: 'Introdução ao CSS', duration: '15:10', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { id: 'l5', title: 'O Modelo de Caixa', duration: '20:30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { id: 'l6', title: 'Layout com Flexbox', duration: '25:15', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Ciência de Dados com Python',
    description: 'Domine análise de dados, visualização e aprendizado de máquina usando Python e bibliotecas populares.',
    instructor: 'Prof. Michael Chen',
    instructorTitle: 'Especialista em Ciência de Dados',
    category: 'Ciência de Dados',
    price: 79.99,
    rating: 4.9,
    students: 892,
    duration: '10 semanas',
    level: 'Intermediário',
    thumbnail: 'data-science',
    syllabus: [
      'Fundamentos de Python',
      'NumPy e Pandas',
      'Visualização de Dados',
      'Análise Estatística',
      'Fundamentos de Machine Learning',
      'Introdução ao Deep Learning',
      'Projetos do Mundo Real',
      'Projeto Capstone'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    modules: [
      {
        id: 'm1',
        title: 'Fundamentos de Python',
        lessons: [
          { id: 'l1', title: 'Configuração do Python', duration: '8:30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false },
          { id: 'l2', title: 'Variáveis e Tipos de Dados', duration: '15:20', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', completed: false }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Masterclass de Marketing Digital',
    description: 'Aprenda SEO, marketing em mídias sociais, estratégia de conteúdo e análise de dados para expandir seu negócio.',
    instructor: 'Emma Williams',
    instructorTitle: 'Estrategista de Marketing',
    category: 'Marketing',
    price: 59.99,
    rating: 4.7,
    students: 2105,
    duration: '6 semanas',
    level: 'Iniciante',
    thumbnail: 'digital-marketing',
    syllabus: [
      'Fundamentos de Marketing',
      'Essenciais de SEO',
      'Marketing de Conteúdo',
      'Estratégia de Mídias Sociais',
      'Email Marketing',
      'Análises e Métricas'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    modules: []
  },
  {
    id: '4',
    title: 'Princípios de UI/UX Design',
    description: 'Crie interfaces bonitas e amigáveis com ferramentas e metodologias padrão da indústria.',
    instructor: 'Alex Rodriguez',
    instructorTitle: 'Designer UX Sênior',
    category: 'Design',
    price: 69.99,
    rating: 4.9,
    students: 1567,
    duration: '7 semanas',
    level: 'Intermediário',
    thumbnail: 'ui-ux-design',
    syllabus: [
      'Design Thinking',
      'Pesquisa de Usuário',
      'Wireframing',
      'Prototipagem',
      'Design Visual',
      'Testes de Usabilidade',
      'Projeto de Portfólio'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    modules: []
  },
  {
    id: '5',
    title: 'Desenvolvimento de Apps Mobile',
    description: 'Construa aplicativos mobile nativos para iOS e Android usando React Native.',
    instructor: 'David Kim',
    instructorTitle: 'Líder de Desenvolvimento Mobile',
    category: 'Desenvolvimento Mobile',
    price: 89.99,
    rating: 4.8,
    students: 743,
    duration: '12 semanas',
    level: 'Avançado',
    thumbnail: 'mobile-development',
    syllabus: [
      'Configuração do React Native',
      'Componentes e Props',
      'Navegação',
      'Gerenciamento de Estado',
      'Integração com API',
      'Publicando seu App'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    modules: []
  },
  {
    id: '6',
    title: 'Análise de Negócios',
    description: 'Aprenda a tomar decisões empresariais baseadas em dados usando Excel, SQL e Tableau.',
    instructor: 'Lisa Anderson',
    instructorTitle: 'Analista de Business Intelligence',
    category: 'Negócios',
    price: 54.99,
    rating: 4.6,
    students: 1890,
    duration: '8 semanas',
    level: 'Iniciante',
    thumbnail: 'business-analytics',
    syllabus: [
      'Funções Avançadas do Excel',
      'SQL para Negócios',
      'Visualização de Dados',
      'Criação de Dashboards',
      'Análise Preditiva',
      'Estudos de Caso'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    modules: []
  }
];

export const studentActivities: Activity[] = [
  {
    id: 'a1',
    courseId: '1',
    courseName: 'Introdução ao Desenvolvimento Web',
    title: 'Construa um Site de Portfólio Pessoal',
    type: 'project',
    dueDate: '2026-01-10',
    status: 'pending'
  },
  {
    id: 'a2',
    courseId: '1',
    courseName: 'Introdução ao Desenvolvimento Web',
    title: 'Quiz de CSS Flexbox',
    type: 'quiz',
    dueDate: '2026-01-08',
    status: 'pending'
  },
  {
    id: 'a3',
    courseId: '2',
    courseName: 'Ciência de Dados com Python',
    title: 'Tarefa de Limpeza de Dados',
    type: 'assignment',
    dueDate: '2026-01-12',
    status: 'pending'
  }
];

export const studentNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Nova Tarefa Publicada',
    message: 'Dra. Sarah Johnson publicou uma nova tarefa em Desenvolvimento Web',
    time: 'há 2 horas',
    read: false
  },
  {
    id: 'n2',
    title: 'Lembrete de Aula ao Vivo',
    message: 'Sua aula ao vivo de Ciência de Dados começa em 1 hora',
    time: 'há 3 horas',
    read: false
  },
  {
    id: 'n3',
    title: 'Nota Publicada',
    message: 'Você recebeu uma nota para "Quiz de Fundamentos de JavaScript"',
    time: 'há 1 dia',
    read: true
  },
  {
    id: 'n4',
    title: 'Atualização do Curso',
    message: 'Novos materiais de aprendizagem adicionados a Princípios de UI/UX Design',
    time: 'há 2 dias',
    read: true
  }
];

export const teacherSubmissions: Submission[] = [
  {
    id: 's1',
    studentName: 'João Silva',
    courseName: 'Introdução ao Desenvolvimento Web',
    assignmentTitle: 'Quiz de Fundamentos de HTML',
    submittedDate: '2026-01-05',
    status: 'pending'
  },
  {
    id: 's2',
    studentName: 'Maria Santos',
    courseName: 'Introdução ao Desenvolvimento Web',
    assignmentTitle: 'Projeto de Layout CSS',
    submittedDate: '2026-01-05',
    status: 'pending'
  },
  {
    id: 's3',
    studentName: 'Pedro Oliveira',
    courseName: 'Introdução ao Desenvolvimento Web',
    assignmentTitle: 'Tarefa de Funções JavaScript',
    submittedDate: '2026-01-04',
    status: 'pending'
  },
  {
    id: 's4',
    studentName: 'Ana Costa',
    courseName: 'Introdução ao Desenvolvimento Web',
    assignmentTitle: 'Desafio de Design Responsivo',
    submittedDate: '2026-01-03',
    status: 'graded',
    grade: 95
  },
  {
    id: 's5',
    studentName: 'Carlos Ferreira',
    courseName: 'Introdução ao Desenvolvimento Web',
    assignmentTitle: 'Quiz de Fundamentos de HTML',
    submittedDate: '2026-01-02',
    status: 'graded',
    grade: 88
  }
];

export const enrolledCourses = [
  {
    ...courses[0],
    progress: 35,
    nextLesson: 'Fundamentos de HTML',
    lastAccessed: 'há 2 horas'
  },
  {
    ...courses[1],
    progress: 12,
    nextLesson: 'Configuração do Python',
    lastAccessed: 'há 1 dia'
  },
  {
    ...courses[3],
    progress: 68,
    nextLesson: 'Testes de Usabilidade',
    lastAccessed: 'há 3 horas'
  }
];

export const studentGrades: StudentGrade[] = [
  {
    id: 'g1',
    courseId: '1',
    courseName: 'Introdução ao Desenvolvimento Web',
    assignmentTitle: 'Quiz de Fundamentos de HTML',
    type: 'quiz',
    grade: 92,
    maxGrade: 100,
    submittedDate: '2026-01-03',
    gradedDate: '2026-01-04',
    feedback: 'Excelente trabalho! Você demonstrou uma ótima compreensão dos conceitos de HTML.'
  },
  {
    id: 'g2',
    courseId: '1',
    courseName: 'Introdução ao Desenvolvimento Web',
    assignmentTitle: 'Projeto de Layout CSS',
    type: 'assignment',
    grade: 88,
    maxGrade: 100,
    submittedDate: '2026-12-28',
    gradedDate: '2026-12-30',
    feedback: 'Bom trabalho no layout responsivo. Considere usar mais Flexbox para melhor alinhamento.'
  },
  {
    id: 'g3',
    courseId: '3',
    courseName: 'Princípios de UI/UX Design',
    assignmentTitle: 'Wireframing Exercise',
    type: 'assignment',
    grade: 95,
    maxGrade: 100,
    submittedDate: '2025-12-20',
    gradedDate: '2025-12-22',
    feedback: 'Wireframes excepcionais com excelente flow do usuário e hierarquia clara.'
  },
  {
    id: 'g4',
    courseId: '3',
    courseName: 'Princípios de UI/UX Design',
    assignmentTitle: 'Quiz de Design Thinking',
    type: 'quiz',
    grade: 78,
    maxGrade: 100,
    submittedDate: '2025-12-15',
    gradedDate: '2025-12-16',
    feedback: 'Revise os princípios de pesquisa de usuário para melhorar sua pontuação.'
  },
  {
    id: 'g5',
    courseId: '1',
    courseName: 'Introdução ao Desenvolvimento Web',
    assignmentTitle: 'Tarefa de Funções JavaScript',
    type: 'assignment',
    grade: 85,
    maxGrade: 100,
    submittedDate: '2025-12-10',
    gradedDate: '2025-12-12',
    feedback: 'Boa implementação das funções. Preste atenção ao tratamento de edge cases.'
  },
  {
    id: 'g6',
    courseId: '2',
    courseName: 'Ciência de Dados com Python',
    assignmentTitle: 'Análise de Dados com Pandas',
    type: 'project',
    grade: 90,
    maxGrade: 100,
    submittedDate: '2025-12-05',
    gradedDate: '2025-12-07',
    feedback: 'Análise abrangente com excelentes visualizações. Continue assim!'
  }
];