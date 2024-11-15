import React from 'react';
import Comment from './Comment';

interface CommentStripeProps {
    comments: { id: number; text: string; author: string }[];
    onDeleteComment: (id: number) => void;
}

const CommentStripe: React.FC<CommentStripeProps> = ({ comments, onDeleteComment }) => (
    <div>
        {comments.map((comment) => (
            <Comment
                key={comment.id}
                text={comment.text}
                author={comment.author}
                onDelete={() => onDeleteComment(comment.id)}
            />
        ))}
    </div>
);

export default CommentStripe;
