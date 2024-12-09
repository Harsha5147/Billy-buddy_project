import React, { useState } from 'react';
import { format } from 'date-fns';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { Experience } from '../../types/experience';
import CommentForm from './CommentForm';

interface ExperienceCardProps {
  experience: Experience;
  onLike: (experienceId: string) => Promise<void>;
  onComment: (experienceId: string, content: string, isAnonymous: boolean) => Promise<void>;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  onLike,
  onComment
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleLike = async () => {
    try {
      await onLike(experience.id);
    } catch (error) {
      console.error('Error liking experience:', error);
    }
  };

  const handleCommentSubmit = async (content: string, isAnonymous: boolean) => {
    try {
      await onComment(experience.id, content, isAnonymous);
      setShowCommentForm(false);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
          <p className="text-sm text-gray-500">
            Shared by {experience.author.username} • {format(new Date(experience.createdAt), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Heart size={20} className={experience.likes > 0 ? 'fill-red-500 text-red-500' : ''} />
            <span>{experience.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageSquare size={20} />
            <span>{experience.comments.length}</span>
          </button>
          <button 
            onClick={() => {
              navigator.share({
                title: experience.title,
                text: experience.content,
                url: window.location.href
              }).catch(console.error);
            }}
            className="text-gray-500 hover:text-indigo-500 transition-colors"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{experience.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {experience.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {showComments && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-700">Comments</h4>
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Add Comment
            </button>
          </div>

          {showCommentForm && (
            <div className="mb-4">
              <CommentForm onSubmit={handleCommentSubmit} />
            </div>
          )}

          {experience.comments.length > 0 ? (
            experience.comments.map(comment => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-gray-500">
                    {comment.author.username} • {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </p>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart size={16} />
                    <span className="text-sm">{comment.likes}</span>
                  </button>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;