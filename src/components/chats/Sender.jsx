import React from "react";

function Sender() {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
          />
        </div>
      </div>
      <div className="chat-header text-gray-500">
        Anakin
        <time className="text-xs opacity-50 text-gray-500">12:46</time>
      </div>
      <div className="chat-bubble bg-orange-700 break-words">I hate you!</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  );
}

export default Sender;
