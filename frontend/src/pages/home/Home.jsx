import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();

  // On mobile: show chat when conversation selected, else sidebar
  const showChatOnMobile = !!selectedConversation;

  return (
    <div className="w-full h-full max-h-[100dvh] sm:max-h-[100vh] flex items-center justify-center p-1 sm:p-2">
      <div className="chat-shell flex w-full h-full sm:h-[560px] md:h-[620px] max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100vh-1rem)]">
        {/* Sidebar - hidden on mobile when chat is open */}
        <div
          className={`
            ${showChatOnMobile ? "hidden sm:flex" : "flex"}
            sm:min-w-[280px] md:min-w-[320px] w-full sm:w-auto
            flex-col border-r border-white/40
            absolute sm:relative inset-0 z-20 sm:z-auto
            bg-[rgba(255,255,255,0.9)] sm:bg-transparent
          `}
        >
          <Sidebar />
        </div>

        {/* Message area - full width on mobile when chat selected */}
        <div
          className={`
            flex flex-col flex-1 min-w-0
            ${!showChatOnMobile ? "hidden sm:flex" : "flex"}
            md:min-w-[450px]
          `}
        >
          <MessageContainer showBackButton={showChatOnMobile} />
        </div>
      </div>
    </div>
  );
};
export default Home;
