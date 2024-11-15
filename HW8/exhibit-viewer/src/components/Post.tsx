import React from 'react';
import './Post.css';

interface Comment {
    id: number;
    author: string;
    text: string;
    date: string;
}

interface PostProps {
    title: string;
    date: string;
    imageUrl: string;
    description: string;
    comments: Comment[];
    onCommentSubmit: (text: string) => void;
}

const Post: React.FC<PostProps> = ({ title, date, imageUrl, description, comments, onCommentSubmit }) => {
    const [commentText, setCommentText] = React.useState("");

    const handleCommentSubmit = () => {
        onCommentSubmit(commentText);
        setCommentText("");
    };

    return (
        <div className="post-card">
            <h2 className="post-title">{title}</h2>
            <p className="post-date">{date}</p>
            <img src={imageUrl} alt="Post" className="post-image" />
            <p className="post-description">{description}</p>
            <div className="post-comments">
                <h3>Comments: {comments.length}</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="post-comment">
                        <p><strong>{comment.author}</strong> ({comment.date}): {comment.text}</p>
                    </div>
                ))}
            </div>
            <div className="comment-form">
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={handleCommentSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Post;
