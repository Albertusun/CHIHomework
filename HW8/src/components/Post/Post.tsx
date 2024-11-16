import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';
import { fetchPosts, deletePost } from '../../api/exhibitActions';
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

const Post: React.FC = ({ isMyPosts }) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(true);
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const currentUser = store.getState().auth.userName || 'Unauth';

  const loadPosts = async (page: number) => {
    try {
      setLoading(true);
      const postList = await fetchPosts(page, isMyPosts);
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

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      loadPosts(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      loadPosts(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadPosts(1);
  }, [isMyPosts, currentPage]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
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
              {currentUser === post.user.username && (
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              )}
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
        ))
      )}
      {posts.length > 0 && (
        <div className={styles.pagination}>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            {'<'} Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next {'>'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
