import React, { useState } from 'react';
import { createExhibit } from '../api/exhibitActions';

const NewPost = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async () => {
        if (image) {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('image', image);

            try {
                await createExhibit(formData);
                setDescription('');
                setImage(null);
                alert('Post created successfully!');
            } catch (error) {
                console.error('Error creating post:', error);
                alert('Failed to create post.');
            }
        } else {
            alert('Please select an image');
        }
    };

    return (
        <div>
            <h2>Create New Post</h2>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default NewPost;
