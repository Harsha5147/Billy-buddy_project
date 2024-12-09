import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { CreateExperienceDto } from '../../types/experience';

interface ExperienceFormProps {
  onSubmit: (data: CreateExperienceDto) => Promise<void>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<CreateExperienceDto>({
    title: '',
    content: '',
    tags: [],
    isAnonymous: false
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = [
    'Social Media', 'School', 'Workplace', 'Gaming',
    'Recovery', 'Support', 'Advice', 'Success Story'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ ...formData, tags: selectedTags });
      setFormData({ title: '', content: '', tags: [], isAnonymous: false });
      setSelectedTags([]);
    } catch (error) {
      console.error('Error submitting experience:', error);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-indigo-600" size={32} />
        <h2 className="text-2xl font-bold">Share Your Experience</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Give your story a title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Story
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            rows={6}
            placeholder="Share your experience and how you overcame it..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={formData.isAnonymous}
            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
            className="rounded text-indigo-600"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-600">
            Share anonymously
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Share Experience
        </button>
      </form>
    </div>
  );
};

export default ExperienceForm;