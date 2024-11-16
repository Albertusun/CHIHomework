import React, { useState } from 'react';
import styles from './AddPostPage.module.css';
import { useNavigate } from 'react-router-dom';
import { uploadPost } from '../api/exhibitActions';

const AddPostPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!image || !description.trim()) {
      setErrorMessage('Both image and description are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('image', image);

      await uploadPost(formData);
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      console.error('Failed to upload post:', error);
      setErrorMessage('Failed to upload post. Please try again.');
    }
  };

  return (
    <div className={styles.addPostPage}>
      <h2>Create a New Post</h2>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        className={styles.fileInput}
      />
      <textarea
        placeholder="Enter a description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />
      <button onClick={handleSubmit} className={styles.submitButton}>
        Post
      </button>
    </div>
  );
};

export default AddPostPage;
