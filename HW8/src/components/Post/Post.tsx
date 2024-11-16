import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';
import { fetchPosts, fetchComments } from '../../api/api';
import Comment from '../Comment/Comment';

interface CommentData {
  id: number;
  text: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
}

interface PostData {
  id: number;
  imageUrl: string;
  description: string;
  user: {
    id: number;
    username: string;
  };
  createdAt: string;
  comments?: CommentData[];
}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});

  const loadPosts = async (page: number) => {
    try {
      setLoading(true);
      const postList = await fetchPosts(page);
      const postsWithComments = await Promise.all(
        postList.map(async (post: PostData) => {
          const comments = await fetchComments(post.id);
          return { ...post, comments };
        })
      );
      setPosts(postsWithComments);
    } catch (error) {
      console.error('Failed to fetch posts or comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = (postId: number) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    // Симулируем добавление комментария (в реальном случае нужно отправить на сервер)
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          text: commentText,
          createdAt: new Date().toISOString(),
          user: { id: 0, username: 'You' },
        };
        return { ...post, comments: [...(post.comments || []), newComment] };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewComments({ ...newComments, [postId]: '' });
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className={styles.postContainer}>
          <div className={styles.post}>
            <div className={styles.header}>
              <span className={styles.username}>{post.user.username}</span>
              <span className={styles.date}>
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <img
              src={`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com${post.imageUrl}`}
              alt={post.description}
              className={styles.image}
            />
            <p className={styles.description}>{post.description}</p>
          </div>
          <div className={styles.commentsSection}>
            <h3>Comments:</h3>
            <div className={styles.comments}>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    username={comment.user.username}
                    content={comment.text}
                  />
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
            <div className={styles.commentForm}>
              <textarea
                placeholder="Write a comment..."
                value={newComments[post.id] || ''}
                onChange={(e) =>
                  setNewComments({ ...newComments, [post.id]: e.target.value })
                }
                className={styles.textarea}
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className={styles.submitButton}
              >
                Post comment
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Post;
