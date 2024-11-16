import React from 'react';
import styles from './Comment.module.css';

interface CommentProps {
  id: number;
  username: string;
  content: string;
  onDelete: (commentId: number) => void;
  currentUser: string;
}

const Comment: React.FC<CommentProps> = ({
  id,
  username,
  content,
  onDelete,
  currentUser,
}) => {
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <span className={styles.username}>{username}</span>
        {currentUser === username && (
          <button className={styles.deleteButton} onClick={() => onDelete(id)}>
            Delete
          </button>
        )}
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default Comment;
