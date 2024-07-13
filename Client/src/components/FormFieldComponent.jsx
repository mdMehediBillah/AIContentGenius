const FormFieldComponent = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurproseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          className="text-sm block font-medium text-gray-900"
          htmlFor={name}
        >
          {labelName}
        </label>
        {isSurproseMe && (
          <button
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] text-black px-2 rounded-[4px]"
          >
            Surprise Me!
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="w-full bg-gray-50 border px-3 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary "
      />
    </div>
  );
};

export default FormFieldComponent;
