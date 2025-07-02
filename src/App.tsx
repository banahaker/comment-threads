import "./App.css";
import { useState } from "react";
import Comment from "./components/comment";
import { sampleData } from "./data/sample";

function App() {
  const [comments] = useState(sampleData);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl text-white font-bold mb-6">Comment Threads</h1>

        <div className="space-y-4 flex flex-col gap-8">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              depth={0}
              parentExpanded={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
