import { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import { Chat } from "./Chat";

export const Form = () => {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "system",
      content: "You are a helpful assistant.",
    },
  ]);

  const [{ stream, message }, setState] = useState({
    stream: true,
    message: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, newMessage]);

    const response = await fetch(
      "http://localhost:5050/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          provider: "open-ai",
          mode: "production",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [...messages, newMessage],
          stream,
        }),
      }
    );

    setState({
      stream,
      message: "",
    });

    if (stream) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result;
      const messageId = crypto.randomUUID();
      while (!(result = await reader.read()).done) {
        const chunk = decoder.decode(result.value, { stream: true });
        const lines = chunk.split("\n"); // Fixed the split delimiter to correct newline character

        lines.forEach((line) => {
          if (line.startsWith("data:")) {
            const jsonStr = line.replace("data:", "").trim();
            try {
              const data = JSON.parse(jsonStr);
              const content = data.choices[0]?.delta?.content;
              if (content) {
                setMessages((prev) => {
                  const found = prev.find((m) => m.id === messageId);

                  if (found) {
                    return prev.map((m) =>
                      m.id === messageId
                        ? { ...m, content: `${m.content}${content}` }
                        : m
                    );
                  }

                  return [
                    ...prev,
                    { role: "assistant", content, id: messageId },
                  ];
                });
              }
            } catch (error) {
              console.error("Failed to parse JSON:", error);
            }
          }
        });
      }
    } else {
      // no stream
      const { message: newMessage } = await response.json(); // Destructured 'message' to 'newMessage'

      setMessages((prev) => [
        ...prev,
        { ...newMessage, id: crypto.randomUUID() },
      ]);
    }
  };

  return (
    <>
      <form
        className="flex flex-col w-[50%] max-w-[550px] p-4 bg-gray-600 rounded-lg shadow-md container mx-auto
      "
        onSubmit={onSubmit}
      >
        <label className="block mb-4">
          <span className="text-white">Stream</span>
          <input
            type="checkbox"
            name="stream"
            onChange={handleChange}
            checked={stream}
            className="ml-2 border-white"
          />
        </label>
        <div className="flex flex-col gap-2">
          <textarea
            name="message"
            placeholder="Type your message here"
            onChange={handleChange}
            value={message}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <div className="flex gap-2 items-center px-4 py-2 bg-rose-600 text-white rounded-md shadow-sm hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-blue-500 justify-center">
            <button type="submit" className="">
              Send
            </button>
            <GrTechnology />
          </div>
        </div>
      </form>
      <Chat messages={messages} />
    </>
  );
};
