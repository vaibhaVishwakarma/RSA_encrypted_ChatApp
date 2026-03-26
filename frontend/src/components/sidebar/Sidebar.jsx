import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="border-r border-white/40 p-4 flex flex-col bg-transparent">
      <SearchInput />
      <div className="divider px-3 my-2 before:bg-slate-300/70 after:bg-slate-300/70"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
