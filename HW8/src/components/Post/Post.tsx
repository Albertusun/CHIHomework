import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';
import { fetchPosts } from '../../api/exhibitActions';
import {
  fetchComments,
  addComment,
  deleteComment,
} from '../../api/commentActions';
import Comment from '../Comment/Comment';
import store from '../../store';

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
  const [hasMore, setHasMore] = useState(true);
  const currentUser = store.getState().auth.userName || 'Unauth';

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
      setPosts((prev) =>
        page === 1 ? postsWithComments : [...prev, ...postsWithComments]
      );
      setHasMore(postList.length > 0);
    } catch (error) {
      console.error('Failed to fetch posts or comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (postId: number) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    try {
      const newComment = await addComment(postId, commentText);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...(post.comments || []), newComment] }
            : post
        )
      );
      setNewComments({ ...newComments, [postId]: '' });
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleDeleteComment = async (postId: number, commentId: number) => {
    try {
      await deleteComment(postId, commentId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments?.filter(
                  (comment) => comment.id !== commentId
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

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
              {post.comments?.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  username={comment.user.username}
                  content={comment.text}
                  onDelete={(commentId) =>
                    handleDeleteComment(post.id, commentId)
                  }
                  currentUser={currentUser}
                />
              ))}
            </div>
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
      ))}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => (hasMore ? prev + 1 : prev))}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Post;
