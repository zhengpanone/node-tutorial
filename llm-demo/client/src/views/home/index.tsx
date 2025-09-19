import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Switch, Input } from "antd";
import { SendOutlined } from "@ant-design/icons"; // antd 内置图标
import { search } from "../../api/search";

export function Home() {
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [useKnowledgeBase, setUseKnowledgeBase] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const oldMessage = [...messages, { text: inputValue, isUser: true }];
      setMessages([...oldMessage]);
      setInputValue("");
      const message = { text: "", isUser: false };
      const response = await search({
        query: inputValue,
        isKnowledge: useKnowledgeBase + "",
      });
      const reader = response.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();
      if (!reader) return;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        value.split("\n\n").forEach((chunk) => {
          if (chunk.startsWith("data: ")) {
            const data = JSON.parse(chunk.replace("data: ", ""));
            message.text += data.content;
            setMessages([...oldMessage, message]);
          }
        });
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-4xl border-2 border-gray-200 rounded-md p-4 mx-auto mt-7 h-5/6 flex flex-col">
      <div className="flex-1 overflow-auto mb-4 space-y-2 scrollbar-thin">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 flex ${
              msg.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xl ${
                msg.isUser ? "bg-blue-500 text-white" : "bg-gray-200 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 底部输入区 */}
      <div className="border-t pt-3">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-gray-600">知识库</span>
          <Switch
            checked={useKnowledgeBase}
            onChange={setUseKnowledgeBase}
            checkedChildren="开"
            unCheckedChildren="关"
          />
        </div>

        <div className="flex items-end gap-2">
          <Input.TextArea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息，按 Enter 发送，Shift+Enter 换行..."
            autoSize={{ minRows: 1, maxRows: 5 }}
            className="flex-1 rounded-xl border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100"
          />
          <button
            onClick={handleSendMessage}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
