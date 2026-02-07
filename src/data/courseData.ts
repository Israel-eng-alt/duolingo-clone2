import type { Course, Section, Unit, Lesson, Exercise, Character } from '@/types'

// Sample Spanish course
export const sampleCourse: Course = {
  id: 'spanish-en-001',
  sourceLanguage: 'en',
  targetLanguage: 'es',
  title: 'Spanish',
  description: 'Learn Spanish from English',
  iconUrl: '/flags/es.svg',
  isActive: true,
  totalUnits: 15,
  estimatedHours: 45,
  cefrLevel: 'A1',
}

// Characters
export const characters: Character[] = [
  {
    id: 'duo',
    name: 'Duo',
    displayName: 'Duo',
    personality: 'Encouraging and persistent owl mascot',
    isActive: true,
  },
  {
    id: 'lily',
    name: 'Lily',
    displayName: 'Lily',
    personality: 'Sarcastic teenager who is secretly smart',
    isActive: true,
  },
  {
    id: 'oscar',
    name: 'Oscar',
    displayName: 'Oscar',
    personality: 'Dramatic theater teacher',
    isActive: true,
  },
  {
    id: 'eddie',
    name: 'Eddie',
    displayName: 'Eddie',
    personality: 'Fitness enthusiast who loves sports',
    isActive: true,
  },
]

// Sections
export const sections: Section[] = [
  {
    id: 'section-1',
    courseId: 'spanish-en-001',
    title: 'Section 1: Basics',
    description: 'Learn the fundamentals',
    orderIndex: 0,
    colorTheme: 'green',
  },
  {
    id: 'section-2',
    courseId: 'spanish-en-001',
    title: 'Section 2: Greetings',
    description: 'Common greetings and introductions',
    orderIndex: 1,
    colorTheme: 'blue',
  },
  {
    id: 'section-3',
    courseId: 'spanish-en-001',
    title: 'Section 3: Travel',
    description: 'Essential travel phrases',
    orderIndex: 2,
    colorTheme: 'purple',
  },
]

// Units
export const units: Unit[] = [
  // Section 1 - Basics
  {
    id: 'unit-1-1',
    sectionId: 'section-1',
    title: 'Unit 1: Basics 1',
    description: 'Introduction to basic Spanish',
    orderIndex: 0,
  },
  {
    id: 'unit-1-2',
    sectionId: 'section-1',
    title: 'Unit 2: Basics 2',
    description: 'Building on the basics',
    orderIndex: 1,
  },
  {
    id: 'unit-1-3',
    sectionId: 'section-1',
    title: 'Unit 3: Common Phrases',
    description: 'Everyday expressions',
    orderIndex: 2,
  },
  // Section 2 - Greetings
  {
    id: 'unit-2-1',
    sectionId: 'section-2',
    title: 'Unit 1: Greetings',
    description: 'Saying hello and goodbye',
    orderIndex: 0,
  },
  {
    id: 'unit-2-2',
    sectionId: 'section-2',
    title: 'Unit 2: Introductions',
    description: 'Introducing yourself and others',
    orderIndex: 1,
  },
  // Section 3 - Travel
  {
    id: 'unit-3-1',
    sectionId: 'section-3',
    title: 'Unit 1: At the Airport',
    description: 'Airport vocabulary',
    orderIndex: 0,
  },
]

// Lessons for Unit 1-1 (Basics 1)
export const unit1Lessons: Lesson[] = [
  { id: 'lesson-1-1-1', unitId: 'unit-1-1', lessonType: 'standard', title: 'Lesson 1', orderIndex: 0, xpReward: 10, isLegendary: false, estimatedTime: 3 },
  { id: 'lesson-1-1-2', unitId: 'unit-1-1', lessonType: 'standard', title: 'Lesson 2', orderIndex: 1, xpReward: 10, isLegendary: false, estimatedTime: 3 },
  { id: 'lesson-1-1-3', unitId: 'unit-1-1', lessonType: 'standard', title: 'Lesson 3', orderIndex: 2, xpReward: 10, isLegendary: false, estimatedTime: 3 },
  { id: 'lesson-1-1-4', unitId: 'unit-1-1', lessonType: 'standard', title: 'Lesson 4', orderIndex: 3, xpReward: 10, isLegendary: false, estimatedTime: 3 },
  { id: 'lesson-1-1-5', unitId: 'unit-1-1', lessonType: 'standard', title: 'Lesson 5', orderIndex: 4, xpReward: 10, isLegendary: false, estimatedTime: 3 },
]

// Sample exercises for Lesson 1
export const lesson1Exercises: Exercise[] = [
  // Multiple choice - Basic vocabulary
  {
    id: 'ex-1-1',
    lessonId: 'lesson-1-1-1',
    exerciseType: 'multiple_choice',
    orderIndex: 0,
    questionData: {
      question: 'Which of these means "apple" in Spanish?',
      options: [
        { id: 'a', text: 'Manzana' },
        { id: 'b', text: 'Naranja' },
        { id: 'c', text: 'Plátano' },
        { id: 'd', text: 'Uva' },
      ],
    },
    answerData: {
      correctAnswer: 'a',
    },
    hint: 'Manzana is a common fruit',
    difficulty: 1,
  },
  // Word bank - Sentence building
  {
    id: 'ex-1-2',
    lessonId: 'lesson-1-1-1',
    exerciseType: 'word_bank',
    orderIndex: 1,
    questionData: {
      sourceText: 'The boy eats an apple',
      wordBank: ['El', 'niño', 'come', 'una', 'manzana', 'la', 'niña', 'bebe'],
    },
    answerData: {
      correctAnswer: ['El', 'niño', 'come', 'una', 'manzana'],
    },
    hint: 'Remember: "El" = The (masculine), "niño" = boy',
    difficulty: 1,
  },
  // Translate to target
  {
    id: 'ex-1-3',
    lessonId: 'lesson-1-1-1',
    exerciseType: 'translate_to_target',
    orderIndex: 2,
    questionData: {
      sourceText: 'Hello',
    },
    answerData: {
      correctAnswer: 'Hola',
      acceptableAnswers: ['¡Hola!'],
    },
    hint: 'It is a common greeting',
    difficulty: 1,
  },
  // Translate to source
  {
    id: 'ex-1-4',
    lessonId: 'lesson-1-1-1',
    exerciseType: 'translate_to_source',
    orderIndex: 3,
    questionData: {
      targetText: 'Buenos días',
    },
    answerData: {
      correctAnswer: 'Good morning',
      acceptableAnswers: ['Good day'],
    },
    hint: 'A greeting used in the morning',
    difficulty: 1,
  },
  // Match pairs
  {
    id: 'ex-1-5',
    lessonId: 'lesson-1-1-1',
    exerciseType: 'match_pairs',
    orderIndex: 4,
    questionData: {
      pairs: [
        { id: '1', left: 'Manzana', right: 'Apple' },
        { id: '2', left: 'Niño', right: 'Boy' },
        { id: '3', left: 'Come', right: 'Eats' },
        { id: '4', left: 'Hola', right: 'Hello' },
      ],
    },
    answerData: {
      correctPairs: [
        { id: '1', left: 'Manzana', right: 'Apple' },
        { id: '2', left: 'Niño', right: 'Boy' },
        { id: '3', left: 'Come', right: 'Eats' },
        { id: '4', left: 'Hola', right: 'Hello' },
      ],
    },
    difficulty: 1,
  },
  // Fill in the blank
  {
    id: 'ex-1-6',
    lessonId: 'lesson-1-1-1',
    exerciseType: 'fill_blank',
    orderIndex: 5,
    questionData: {
      question: '___ niño come una manzana.',
      options: [
        { id: 'a', text: 'El' },
        { id: 'b', text: 'La' },
        { id: 'c', text: 'Un' },
        { id: 'd', text: 'Una' },
      ],
    },
    answerData: {
      correctAnswer: 'a',
    },
    hint: 'Niño is masculine',
    explanation: 'Use "El" for masculine nouns like "niño"',
    difficulty: 2,
  },
  // Listen and type
  {
    id: 'ex-1-7',
    lessonId: 'lesson-1-1-1',
    exerciseType: 'listen_and_type',
    orderIndex: 6,
    questionData: {
      audioUrl: '/audio/hola-buenos-dias.mp3',
    },
    answerData: {
      correctAnswer: 'Hola, buenos días',
      acceptableAnswers: ['Hola buenos días'],
    },
    hint: 'A greeting with good morning',
    difficulty: 2,
  },
]

// Additional exercises for variety
export const generateLessonExercises = (lessonId: string, count: number = 7): Exercise[] => {
  const templates = [
    {
      exerciseType: 'multiple_choice' as const,
      generate: (index: number) => ({
        id: `ex-${lessonId}-${index}`,
        lessonId,
        exerciseType: 'multiple_choice' as const,
        orderIndex: index,
        questionData: {
          question: 'Select the correct translation',
          options: [
            { id: 'a', text: 'Option A' },
            { id: 'b', text: 'Option B' },
            { id: 'c', text: 'Option C' },
            { id: 'd', text: 'Option D' },
          ],
        },
        answerData: { correctAnswer: 'a' },
        difficulty: 1,
      }),
    },
    {
      exerciseType: 'word_bank' as const,
      generate: (index: number) => ({
        id: `ex-${lessonId}-${index}`,
        lessonId,
        exerciseType: 'word_bank' as const,
        orderIndex: index,
        questionData: {
          sourceText: 'Sample sentence',
          wordBank: ['Word1', 'Word2', 'Word3', 'Word4', 'Word5'],
        },
        answerData: { correctAnswer: ['Word1', 'Word2'] },
        difficulty: 2,
      }),
    },
  ]

  return Array.from({ length: count }, (_, i) => {
    const template = templates[i % templates.length]
    return template.generate(i)
  })
}

// Helper function to get exercises for a lesson
export function getLessonExercises(lessonId: string): Exercise[] {
  if (lessonId === 'lesson-1-1-1') {
    return lesson1Exercises
  }
  return generateLessonExercises(lessonId)
}

// Helper function to get units by section
export function getUnitsBySection(sectionId: string): Unit[] {
  return units.filter((unit) => unit.sectionId === sectionId)
}

// Helper function to get lessons by unit
export function getLessonsByUnit(unitId: string): Lesson[] {
  if (unitId === 'unit-1-1') {
    return unit1Lessons
  }
  return []
}
