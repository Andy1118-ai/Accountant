import React, { useEffect, useRef, useState } from 'react';
import { Paperclip, Send } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'client' | 'admin';
  type: 'text' | 'file';
  content: string; // text or file url
  fileName?: string;
  fileType?: string;
  time: string;
}

interface Props {
  participant: 'client' | 'admin'; // current user role
}

const ChatWindow: React.FC<Props> = ({ participant }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // scroll to bottom when new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendText = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: participant,
      type: 'text',
      content: input.trim(),
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // simulate admin reply after 1s if current user is client
    if (participant === 'client') {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'admin',
          type: 'text',
          content: 'Thanks for reaching out. We will get back to you.',
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, reply]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendText();
    }
  };

  const chooseFile = () => fileInputRef.current?.click();

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: participant,
      type: 'file',
      content: url,
      fileName: file.name,
      fileType: file.type,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, msg]);
    e.target.value = '';
  };

  return (
    <div className="h-[70vh] w-full border rounded-lg flex flex-col bg-gray-200/40">
      {/* Header */}
      <div className="p-4 border-b bg-primary-600 text-white rounded-t-lg">
        <h3 className="font-semibold">Admin</h3>
        <p className="text-xs opacity-75">Secure chat</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')] bg-repeat p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${msg.sender === participant ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs break-words rounded-lg p-2 text-sm shadow ${
                msg.sender === participant ? 'bg-green-200' : 'bg-white'
              }`}
            >
              {msg.type === 'text' ? (
                <span>{msg.content}</span>
              ) : msg.fileType?.startsWith('image/') ? (
                <img src={msg.content} alt={msg.fileName} className="max-w-full rounded" />
              ) : (
                <a
                  href={msg.content}
                  download={msg.fileName}
                  className="text-blue-600 underline"
                >
                  {msg.fileName}
                </a>
              )}
              <div className="text-[10px] text-gray-500 text-right mt-1">
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t bg-white flex items-center space-x-2 rounded-b-lg">
        <button
          onClick={chooseFile}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelected}
          accept="image/*,application/pdf"
          className="hidden"
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
        <button
          onClick={sendText}
          className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600"
          aria-label="Send"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
