import React from 'react';
import styles from './Comment.module.css';

interface CommentProps {
  username: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({ username, content }) => {
  return (
    <div className={styles.comment}>
      <span className={styles.username}>{username}</span>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default Comment;
