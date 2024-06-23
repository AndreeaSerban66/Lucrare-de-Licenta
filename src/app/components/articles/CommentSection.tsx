import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import CommentTextArea from "@/app/components/articles/Comment";
import UserComment from "@/app/components/articles/UserComment";
import Button from "@/app/components/Button";
import defaultUserIcon from "@/app/images/default-user-icon.png";

interface Comment {
  id: number;
  content: string;
  userEmail: string;
  createdAt: string;
  user?: {
    name?: string;
    image?: string;
  };
}

interface CommentSectionProps {
  articleSlug: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleSlug }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/articles/${articleSlug}/comments`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
        }
      } else {
        setComments([]);
      }
    };

    fetchComments();
  }, [articleSlug]);

  const handleCommentSubmit = async (comment: string) => {
    if (!session || !session.user?.email) return;

    const response = await fetch(`/api/articles/${articleSlug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleSlug,
        content: comment,
        userEmail: session.user.email,
      }),
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments([...comments, newComment]);
    }
  };

  return (
    <div className="bg-atomic_tangerine p-10 rounded-2xl mb-10">
      <h2 className="text-2xl font-bold font-poppins p-3">Comentarii</h2>
      {session ? (
        <CommentTextArea onSubmit={handleCommentSubmit} />
      ) : (
        <div className="text-2xl font-poppins text-center text-black flex justify-center items-center flex-col gap-3">
          Trebuie sa fii logat pentru a lasa un comentariu.
          <Button variant="caribbean">
            <a href="/login">Login</a>
          </Button>
        </div>
      )}
      <div className="mt-6">
        {comments.map((comment) => (
          <UserComment
            key={comment.id}
            name={comment.user?.name || "Anonymous"}
            icon={comment.user?.image || defaultUserIcon}
            date={new Date(comment.createdAt)}
            comment={comment.content}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
