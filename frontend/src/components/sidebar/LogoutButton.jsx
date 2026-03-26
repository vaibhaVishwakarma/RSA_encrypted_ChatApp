import useLogout from "../../hooks/useLogout";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <button
          type="button"
          onClick={logout}
          className="btn btn-sm rounded-xl bg-white/70 border border-white/60 text-slate-700 hover:bg-white/90"
          aria-label="Logout"
        >
          <BiLogOut className="w-5 h-5" />
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
