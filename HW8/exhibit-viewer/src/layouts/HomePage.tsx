import React, { useEffect, useState } from 'react';
import { getMyPosts } from '../api/exhibitActions';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

const HomePage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMyPosts();
            setPosts(response.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>Author: {post.author}</p>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
