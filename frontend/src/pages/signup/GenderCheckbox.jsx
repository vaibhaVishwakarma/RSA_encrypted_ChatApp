const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex items-center gap-4 px-1 pt-2">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          } `}
        >
          <span className="text-slate-700 font-medium">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-400 [--chkbg:#60a5fa] [--chkfg:white]"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer  ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="text-slate-700 font-medium">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-400 [--chkbg:#60a5fa] [--chkfg:white]"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
