import { useState } from "react";
import MessageIcon from "@mui/icons-material/Message";

function Send({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 w-full bg-white border-t p-4"
    >
      <div className="max-w-4xl mx-auto flex items-center space-x-4">
        <div className="text-gray-500">
          <MessageIcon fontSize="small" />
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border border-gray-500 rounded-full focus:outline-none focus:border-orange-500 text-black text-xs placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-2 text-white bg-orange-600 rounded-full hover:bg-orange-700 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default Send;
