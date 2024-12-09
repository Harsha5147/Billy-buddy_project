import { User } from './user';

export interface Experience {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  isAnonymous: boolean;
  author: {
    username: string;
    avatarUrl?: string;
  };
  comments: ExperienceComment[];
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ExperienceComment {
  id: string;
  userId: string;
  experienceId: string;
  content: string;
  author: {
    username: string;
    avatarUrl?: string;
  };
  likes: number;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExperienceDto {
  title: string;
  content: string;
  tags: string[];
  isAnonymous: boolean;
}

export interface CreateCommentDto {
  content: string;
  isAnonymous: boolean;
}