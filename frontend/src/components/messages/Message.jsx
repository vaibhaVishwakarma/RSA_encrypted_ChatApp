import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import Avatar from "../Avatar";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const user = fromMe ? authUser : selectedConversation;
  const formattedTime = extractTime(message.createdAt);
  const bubbleClass = fromMe ? "from-me" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image">
        <Avatar
          fullName={user?.fullName}
          profilePic={user?.profilePic}
          size="w-10"
        />
      </div>
      <div className={`chat-bubble message-bubble ${bubbleClass} ${shakeClass} pb-2 maxWidth`}>
        {message.message}
      </div>
      <div className="chat-footer text-slate-500 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
