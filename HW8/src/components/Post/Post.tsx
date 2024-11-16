import React, { useState } from 'react';
import styles from './Post.module.css';
import Comment from '../Comment/Comment';

const PostComponent: React.FC = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.post}>
        <div className={styles.header}>
          <span className={styles.username}>Uncle_Johnik</span>
          <span className={styles.date}>11.11.2024 22:55:18</span>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png"
          alt="Congratulations"
          className={styles.image}
        />
        <p className={styles.description}>
          Description: A manual deploy!!!!!!!!!!
        </p>
      </div>
      <div className={styles.commentsSection}>
        <h3>Comments:</h3>
        <div className={styles.comments}>
          {comments.map((comment, index) => (
            <Comment key={index} username="User" content={comment} />
          ))}
        </div>
        <div className={styles.commentForm}>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={styles.textarea}
          />
          <button onClick={handleCommentSubmit} className={styles.submitButton}>
            Post comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
