import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import Button from '../ui/Button';

interface BookmarkButtonProps {
  lessonId: string;
  onBookmark?: (lessonId: string, bookmarked: boolean) => void;
  initialBookmarked?: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  lessonId,
  onBookmark,
  initialBookmarked = false
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const toggleBookmark = () => {
    const newBookmarked = !isBookmarked;
    setIsBookmarked(newBookmarked);
    if (onBookmark) {
      onBookmark(lessonId, newBookmarked);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleBookmark}
        className={`${
          isBookmarked 
            ? 'text-yellow-400 hover:text-yellow-300' 
            : 'text-gray-400 hover:text-yellow-400'
        }`}
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-4 w-4 mr-2" />
        ) : (
          <Bookmark className="h-4 w-4 mr-2" />
        )}
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </Button>
    </motion.div>
  );
};

export default BookmarkButton;