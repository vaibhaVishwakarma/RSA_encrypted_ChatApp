import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const { selectedConversation } = useConversation();

  // On mobile: show chat when conversation selected, else sidebar
  const showChatOnMobile = !!selectedConversation;

  return (
    <div className="w-full h-full max-h-[100dvh] sm:max-h-[100vh] flex items-center justify-center p-2 sm:p-4">
      <div className="flex w-full h-full sm:h-[550px] md:h-[600px] max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100vh-2rem)] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow-xl">
        {/* Sidebar - hidden on mobile when chat is open */}
        <div
          className={`
            ${showChatOnMobile ? "hidden sm:flex" : "flex"}
            sm:min-w-[280px] md:min-w-[320px] w-full sm:w-auto
            flex-col border-r border-slate-500
            absolute sm:relative inset-0 z-20 sm:z-auto
            bg-[rgba(0,0,0,0.85)] sm:bg-transparent
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
