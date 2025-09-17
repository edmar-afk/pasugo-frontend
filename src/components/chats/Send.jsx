import MessageIcon from "@mui/icons-material/Message";

function Send() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
      <div className="max-w-4xl mx-auto flex items-center space-x-4">
        <div className="text-gray-500 hover:text-gray-700 transition">
          <MessageIcon fontSize="small" />
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-500 rounded-full focus:outline-none focus:border-orange-500 text-black text-xs placeholder-gray-400"
        />
        <button className="p-2 text-white bg-orange-600 rounded-full hover:bg-orange-700 transition">
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
    </div>
  );
}

export default Send;
