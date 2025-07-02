import { useState, useEffect } from "react";
import type { Comment } from "../data/sample";
import arrow from "../assets/arrow.svg";

export default function Comment({
  comment,
  depth = 0,
  parentExpanded = true,
}: {
  comment: Comment;
  depth?: number;
  parentExpanded?: boolean;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (depth === 0) setExpanded(true);
  }, [depth]);

  const handleReply = () => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        author: "You",
        content: replyText,
        timestamp: "now",
        avatar: "👤",
        replies: [],
      };
      setReplies([...replies, newReply]);
      setReplyText("");
      setShowReplyForm(false);
      setExpanded(true);
    }
  };

  const indentLevel = Math.min(depth, 8);
  const marginLeft = indentLevel * 20;

  if (!parentExpanded) return null;

  return (
    <div className="relative" style={{ marginLeft: `${marginLeft}px` }}>
      {depth > 0 && (
        <div
          className="thread-line"
          style={{
            position: "absolute",
            left: "-12px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "linear-gradient(to bottom, #374151 60%, #2563eb 100%)",
            borderRadius: "1px",
            zIndex: 0,
          }}
        />
      )}

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{comment.avatar}</span>
          <span className="text-blue-400 font-medium">{comment.author}</span>
          <span className="text-gray-500 text-sm">• {comment.timestamp}</span>
        </div>

        <div className="text-gray-200 mb-3">{comment.content}</div>

        <div className="flex items-center gap-4">
          <p
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors"
          >
            Reply
          </p>
        </div>

        <div className="flex justify-center h-0">
          {replies && replies.length > 0 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-600 bg-gray-800 text-gray-300 hover:bg-blue-700 hover:text-white transition-colors shadow z-10 ${
                expanded ? "rotate-180" : ""
              }`}
              aria-label={expanded ? "Collapse replies" : "Expand replies"}
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
            >
              <img src={arrow} alt="arrow" />
            </button>
          )}
        </div>

        {showReplyForm && (
          <div className="mt-4 p-3 bg-gray-900 rounded-lg">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="w-full bg-gray-800 text-gray-200 border border-gray-600 rounded-md p-2 text-sm resize-none"
              rows={3}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleReply}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Reply
              </button>
              <button
                onClick={() => {
                  setShowReplyForm(false);
                  setReplyText("");
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {expanded && replies && replies.length > 0 && (
        <div className="ml-4">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              parentExpanded={expanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}
