export const Message = ({ message }) => {
  return (
    <div
      className={
        message.role === "user"
          ? "bg-rose-900 py-2 px-4 ml-32 rounded"
          : "bg-gray-600 py-2 px-4 rounded"
      }
    >
      <p>{message.content}</p>
    </div>
  );
};
