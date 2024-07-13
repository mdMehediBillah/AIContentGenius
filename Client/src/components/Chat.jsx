import { Message } from "./Message";

export const Chat = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-500 rounded-lg shadow-md text-white container mx-auto mt-2">
      {messages
        ?.filter((message) => message.role !== "system")
        .map((message) => {
          return <Message key={message.id} message={message} />;
        })}
    </div>
  );
};

// import { Message } from './Message';

// export const Chat = ({ messages }) => {
//   return (
//     <div>
//       {messages
//         ?.filter((message) => message.role !== 'system')
//         .map((message) => {
//           return <Message key={message.id} message={message} />;
//         })}
//     </div>
//   );
// };
