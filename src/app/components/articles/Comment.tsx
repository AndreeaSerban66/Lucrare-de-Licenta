import React, { useState } from "react";
import Button from "../Button";

interface CommentTextAreaProps {
  onSubmit: (comment: string) => void;
}

const CommentTextArea: React.FC<CommentTextAreaProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Scrie un comentariu..."
        className="w-full p-3 flex-grow text-black"
      ></textarea>
      <Button text="Trimite" variant="caribbean" className="flex-shrink-0" />
    </form>
  );
};

export default CommentTextArea;
