import React from "react";

function Receiver() {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
          />
        </div>
      </div>
      <div className="chat-header text-gray-500">
        Obi-Wan Kenobi
        <time className="text-xs opacity-50 text-gray-500">12:45</time>
      </div>
      <div className="chat-bubble bg-orange-500 break-words">
        You were the Chosen One!asddasdasdasdasdasdasdadssdsdsdasasdasdsd asdasd
        asdas dasd sd asd
      </div>

      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
}

export default Receiver;
