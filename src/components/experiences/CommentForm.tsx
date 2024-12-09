import React, { useState } from 'react';
import { CreateCommentDto } from '../../types/experience';

interface CommentFormProps {
  onSubmit: (data: CreateCommentDto) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CreateCommentDto>({
    content: '',
    isAnonymous: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({ content: '', isAnonymous: false });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Comment
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          rows={3}
          placeholder="Share your thoughts..."
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous-comment"
            checked={formData.isAnonymous}
            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
            className="rounded text-indigo-600"
          />
          <label htmlFor="anonymous-comment" className="text-sm text-gray-600">
            Comment anonymously
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;