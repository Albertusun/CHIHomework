import React from 'react';

interface CommentProps {
    text: string;
    author: string;
    onDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({ text, author, onDelete }) => (
    <div>
        <p>{text}</p>
        <small>— {author}</small>
        <button onClick={onDelete}>Delete</button>
    </div>
);

export default Comment;
