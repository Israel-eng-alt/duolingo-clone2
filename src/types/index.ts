// User types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  
  // Settings
  nativeLanguage: string;
  dailyGoalXp: number;
  soundEffects: boolean;
  speakingEnabled: boolean;
  listeningEnabled: boolean;
  timezone: string;
  
  // Gamification
  totalXp: number;
  gems: number;
  hearts: number;
  heartsMax: number;
  heartsRefillAt?: Date;
  
  // Subscription
  subscriptionTier: 'free' | 'super' | 'max';
  subscriptionEnds?: Date;
  
  // Status
  isVerified: boolean;
  lastActiveAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

// Course types
export interface Course {
  id: string;
  sourceLanguage: string;
  targetLanguage: string;
  title: string;
  description: string;
  iconUrl: string;
  isActive: boolean;
  totalUnits: number;
  estimatedHours?: number;
  cefrLevel?: string;
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  iconUrl?: string;
  colorTheme?: string;
}

export interface Unit {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  orderIndex: number;
  guidebookUrl?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  lessonType: 'standard' | 'story' | 'review' | 'test' | 'legendary' | 'audio';
  title?: string;
  orderIndex: number;
  xpReward: number;
  isLegendary: boolean;
  estimatedTime: number;
}

// Exercise types
export type ExerciseType = 
  | 'translate_to_target'
  | 'translate_to_source'
  | 'listen_and_type'
  | 'listen_and_select'
  | 'speak'
  | 'multiple_choice'
  | 'fill_blank'
  | 'word_bank'
  | 'match_pairs'
  | 'select_image'
  | 'story_question'
  | 'character_intro';

export interface Exercise {
  id: string;
  lessonId: string;
  exerciseType: ExerciseType;
  orderIndex: number;
  questionData: QuestionData;
  answerData: AnswerData;
  hint?: string;
  explanation?: string;
  difficulty: number;
}

export interface QuestionData {
  sourceText?: string;
  targetText?: string;
  audioUrl?: string;
  imageUrl?: string;
  wordBank?: string[];
  options?: Option[];
  pairs?: Pair[];
  question?: string;
}

export interface AnswerData {
  correctAnswer?: string | string[];
  acceptableAnswers?: string[];
  correctPairs?: Pair[];
}

export interface Option {
  id: string;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface Pair {
  id: string;
  left: string;
  right: string;
}

// Vocabulary
export interface Vocabulary {
  id: string;
  courseId: string;
  word: string;
  translation: string;
  partOfSpeech?: string;
  gender?: string;
  pronunciation?: string;
  audioUrl?: string;
  imageUrl?: string;
  exampleSentence?: string;
  notes?: string;
  difficulty: number;
}

// User Progress
export interface UserCourse {
  id: string;
  userId: string;
  courseId: string;
  isActive: boolean;
  xpEarned: number;
  currentUnitId?: string;
  lessonsCompleted: number;
  startedAt: Date;
  lastActivity: Date;
}

export interface UserUnitProgress {
  id: string;
  userId: string;
  unitId: string;
  crownLevel: number;
  isComplete: boolean;
  isLegendary: boolean;
  lessonsCompleted: number;
  lastPracticed?: Date;
}

export interface LessonAttempt {
  id: string;
  userId: string;
  lessonId: string;
  xpEarned: number;
  accuracy: number;
  timeSpent: number;
  heartsLost: number;
  isPerfect: boolean;
  completedAt: Date;
}

// Gamification
export interface UserStreak {
  id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  streakStart?: Date;
  lastActivity?: Date;
  freezeUsed: boolean;
  freezeAvailable: number;
  weekendAmulet: boolean;
}

export interface StreakHistory {
  id: string;
  userId: string;
  date: Date;
  xpEarned: number;
  lessonsDone: number;
  streakProtected: boolean;
}

export interface XpHistory {
  id: string;
  userId: string;
  amount: number;
  source: 'lesson' | 'story' | 'review' | 'quest' | 'achievement' | 'test' | 'clash' | 'bonus';
  sourceId?: string;
  earnedAt: Date;
}

// Achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  iconUrl?: string;
  tier: number;
  xpReward: number;
  gemReward: number;
  requirement: AchievementRequirement;
  isActive: boolean;
}

export interface AchievementRequirement {
  type: string;
  value: number;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  progress: number;
  isComplete: boolean;
  completedAt?: Date;
}

// Leaderboards
export interface League {
  id: string;
  name: string;
  tier: number;
  iconUrl?: string;
  promotionCount: number;
  demotionCount: number;
}

export interface LeagueGroup {
  id: string;
  leagueId: string;
  weekStart: Date;
  weekEnd: Date;
  isActive: boolean;
}

export interface LeagueMember {
  id: string;
  groupId: string;
  userId: string;
  weeklyXp: number;
  rank?: number;
  joinedAt: Date;
}

// Quests
export interface Quest {
  id: string;
  questType: 'daily' | 'weekly' | 'monthly' | 'friends';
  title: string;
  description?: string;
  requirement: QuestRequirement;
  xpReward: number;
  gemReward: number;
  isActive: boolean;
}

export interface QuestRequirement {
  type: string;
  target: number;
}

export interface UserQuest {
  id: string;
  userId: string;
  questId: string;
  partnerId?: string;
  progress: number;
  target: number;
  isComplete: boolean;
  expiresAt?: Date;
  completedAt?: Date;
}

// Social
export interface Friendship {
  id: string;
  followerId: string;
  followingId: string;
  isMutual: boolean;
  createdAt: Date;
}

// Stories
export interface Story {
  id: string;
  courseId: string;
  title: string;
  difficulty: number;
  xpReward: number;
  thumbnailUrl?: string;
  durationMinutes: number;
  orderIndex?: number;
  isActive: boolean;
}

export interface StorySegment {
  id: string;
  storyId: string;
  orderIndex: number;
  segmentType: 'narration' | 'dialogue' | 'question' | 'intro';
  characterId?: string;
  content: StoryContent;
}

export interface StoryContent {
  text: string;
  audioUrl?: string;
  choices?: Option[];
  correctChoiceId?: string;
}

export interface Character {
  id: string;
  name: string;
  displayName?: string;
  personality?: string;
  avatarUrl?: string;
  voiceActorId?: string;
  isActive: boolean;
}
