import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { 
  Bot, 
  ArrowUp, 
  Menu, 
  X, 
  Plus, 
  MessageSquare, 
  Sprout, 
  Bug, 
  Droplet, 
  TrendingUp, 
  User,
  Trash2
} from "lucide-react";
import { askAI } from "../services/aiService";
import {
  getConversations,
  createConversation,
  getConversation,
  sendConversationMessage,
  deleteConversation
} from "../services/conversationService";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

const SUGGESTIONS = [
  { text: "Which crop should I grow this season?", icon: Sprout },
  { text: "How do I control aphids in tomato?", icon: Bug },
  { text: "Best fertilizer for wheat?", icon: Droplet },
  { text: "How can I save water in irrigation?", icon: TrendingUp },
];

const INTRO_FEATURES = [
  "Crop recommendations",
  "Pest and disease management",
  "Fertilizer guidance",
  "Irrigation practices",
  "Soil health",
  "Government agriculture schemes",
  "Sustainable farming methods"
];

const getTimestamp = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const createInitialMessages = () => [
  {
    id: crypto.randomUUID(),
    sender: "ai",
    content: `🌱 **Welcome to CropSage AI Farm Assistant.**\n\nI can help you with the options below. Click any topic directly to begin or type your query:`,
    time: getTimestamp(),
    isIntro: true 
  },
];

const formatMessages = (rawMessages) => {
  if (!rawMessages || rawMessages.length === 0) return createInitialMessages();
  return rawMessages.map((m) => ({
    id: m._id || crypto.randomUUID(),
    sender: m.role === "assistant" || m.sender === "ai" ? "ai" : "user",
    content: m.content || m.text,
    time: m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : getTimestamp()
  }));
};

function AIAssistant() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const darkMode = theme === "dark";
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const [messages, setMessages] = useState(createInitialMessages);
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchConversationsList = async () => {
    if (!isAuthenticated) return;
    try {
      const data = await getConversations();
      const list = Array.isArray(data) ? data : data?.conversations || [];
      setConversations(list);
    } catch {
      toast.error("Failed to fetch sidebar conversation history.");
    }
  };

  useEffect(() => {
    fetchConversationsList();
  }, [isAuthenticated]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [inputValue]);

  const handleSelectConversation = async (convId) => {
    if (loading || activeConversationId === convId) return;
    setIsSidebarOpen(false);
    setLoading(true);

    try {
      const data = await getConversation(convId);
      const fetchedConversation = data.conversation || data;
      setActiveConversationId(convId);
      setMessages(formatMessages(fetchedConversation?.messages));
    } catch {
      toast.error("Could not retrieve selected conversation context.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = async (e, convId) => {
    e.stopPropagation();
    try {
      await deleteConversation(convId);
      setConversations((prev) => prev.filter((c) => (c._id || c.id) !== convId));
      if (activeConversationId === convId) {
        resetChat();
      }
      toast.success("Conversation removed.");
    } catch {
      toast.error("Failed to delete target conversation.");
    }
  };

  const handleSendMessage = async (textToSend) => {
    if (loading) return;
    
    const query = textToSend || inputValue;
    if (!query.trim()) {
      toast.error("Please enter a question.");
      return;
    }

    if (!textToSend) setInputValue("");
    setLoading(true);

    try {
      if (isAuthenticated) {
        let currentConvId = activeConversationId;

        if (!currentConvId) {
          const newConv = await createConversation();
          currentConvId = newConv._id || newConv.id || newConv.conversation?._id;
          setActiveConversationId(currentConvId);
        }

        const updatedConversation = await sendConversationMessage(currentConvId, query);
        const convData = updatedConversation.conversation || updatedConversation;
        
        setMessages(formatMessages(convData?.messages));
        fetchConversationsList();
      } else {
        const tempUserMsg = { 
          id: crypto.randomUUID(), 
          sender: "user", 
          content: query,
          time: getTimestamp()
        };
        setMessages((prev) => [...prev, tempUserMsg]);

        const data = await askAI(query);
        if (!data || !data.success) {
          throw new Error(data?.error || "Malformed backend response payload.");
        }

        const reply = typeof data.reply === "string" && data.reply.trim().length > 0
          ? data.reply.trim()
          : "Sorry, I couldn't generate a response.";

        setMessages((prev) => [
          ...prev,
          { 
            id: crypto.randomUUID(), 
            sender: "ai", 
            content: reply,
            time: getTimestamp()
          },
        ]);
      }
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("AI request limit reached. Please try again later.");
      } else if (error.code === "ECONNABORTED") {
        toast.error("Request timed out.");
      } else if (!error.response) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("Unable to reach AI. Please try again.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "ai",
          content: "Sorry, I couldn't process your request right now. Please try again.",
          time: getTimestamp()
        },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const resetChat = async () => {
    if (loading) return;
    setInputValue("");
    setIsSidebarOpen(false);

    if (isAuthenticated) {
      try {
        setLoading(true);
        const newConv = await createConversation();
        const convId = newConv._id || newConv.id || newConv.conversation?._id;
        setActiveConversationId(convId);
        setMessages(createInitialMessages());
        fetchConversationsList();
      } catch {
        toast.error("Could not start a new conversation.");
      } finally {
        setLoading(false);
      }
    } else {
      setActiveConversationId(null);
      setMessages(createInitialMessages());
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden antialiased transition-colors duration-300 ${
      darkMode ? "bg-[#0f172a] text-slate-100" : "bg-slate-50 text-slate-900"
    }`}>
      <Navbar />

      <section className="flex flex-1 overflow-hidden relative">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside className={`fixed inset-y-0 left-0 md:relative md:flex w-64 lg:w-72 p-4 flex-col z-50 border-r transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${
          darkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-200"
        }`}>
          <div className="flex justify-between items-center md:hidden mb-4">
            <span className="font-semibold text-sm text-green-500 uppercase tracking-wider">Navigation Menu</span>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="p-1 hover:bg-slate-500/10 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button 
            onClick={resetChat}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 border ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } ${
              darkMode ? "border-slate-700 hover:bg-slate-800 text-slate-200" : "border-slate-300 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <Plus className="w-5 h-5" /> New Chat
          </button>

          <div 
            className="mt-6 flex-1 overflow-y-auto space-y-4 text-sm font-medium text-slate-400"
            style={{ scrollbarGutter: "stable" }}
          >
            <div>
              <div className="px-2 mb-2 text-sm font-semibold tracking-wider uppercase opacity-60">History</div>
              {conversations.length === 0 ? (
                <div className="px-2 py-3 text-sm italic opacity-40">No saved conversations found.</div>
              ) : (
                <div className="space-y-1">
                  {conversations.map((item) => {
                    const convId = item._id || item.id;
                    const isSelected = activeConversationId === convId;
                    return (
                      <div
                        key={convId}
                        onClick={() => handleSelectConversation(convId)}
                        className={`group flex items-center justify-between gap-2.5 px-2.5 py-2.5 rounded-lg text-base font-medium cursor-pointer transition-all duration-200 max-w-full ${
                          loading ? "pointer-events-none opacity-40" : ""
                        } ${
                          isSelected
                            ? darkMode
                              ? "bg-slate-800 text-green-400"
                              : "bg-slate-100 text-green-700"
                            : darkMode
                            ? "hover:bg-slate-800/60 text-slate-300"
                            : "hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate flex-1 min-w-0">
                          <MessageSquare className="w-4 h-4 opacity-70 shrink-0" />
                          <span className="truncate block">{item.title || "Untitled Chat"}</span>
                        </div>
                        <button
                          onClick={(e) => handleDeleteConversation(e, convId)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity shrink-0"
                          aria-label="Delete conversation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="flex flex-1 flex-col h-full overflow-hidden relative">
          <div className={`flex items-center justify-between px-4 py-3 md:px-6 border-b transition-colors ${
            darkMode ? "bg-[#0f172a]/80 border-slate-800" : "bg-white/80 border-slate-200"
          }`}>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 rounded-lg hover:bg-slate-500/10 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-bold text-base md:text-lg tracking-wide flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[#22c55e]" /> CropSage AI
                </h2>
                <p className="text-sm text-slate-400 font-medium tracking-wide">Powered by Gemini</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div aria-live="polite" className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, idx) => (
                <div key={msg.id} className="space-y-4">
                  <div
                    className={`flex gap-3 max-w-[90%] md:max-w-[80%] transition-transform duration-300 hover:-translate-y-0.5 animate-[fadeIn_0.25s_ease-out] ${
                      msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border text-sm ${
                      msg.sender === "user" ? "bg-slate-500/10 border-slate-400/20" : "bg-green-500/10 border-green-500/20 text-[#22c55e]"
                    }`}>
                      {msg.sender === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>

                    <div className="flex flex-col max-w-full">
                      <div className={`px-4 py-3 rounded-3xl text-base leading-6 whitespace-pre-wrap shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#22c55e] text-white rounded-br-lg"
                          : darkMode
                          ? "bg-[#1e293b] text-slate-100 border border-slate-800 rounded-bl-lg"
                          : "bg-white text-slate-900 border border-slate-200 rounded-bl-lg"
                      }`}>
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-5 mb-1 space-y-0.5">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 mb-1 space-y-0.5">{children}</ol>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>

                        {msg.isIntro && (
                          <div className="mt-3 flex flex-col gap-1.5 border-t border-slate-700/30 pt-3">
                            {INTRO_FEATURES.map((feature, fIdx) => (
                              <button
                                key={fIdx}
                                disabled={loading}
                                onClick={() => handleSendMessage(feature)}
                                className={`text-left text-xs font-medium py-1.5 px-3 rounded-lg border transition-all duration-150 ${
                                  darkMode 
                                    ? "bg-slate-800/40 border-slate-700/60 text-green-400 hover:bg-slate-800 hover:text-green-300" 
                                    : "bg-slate-50 border-slate-200 text-green-700 hover:bg-slate-100 hover:text-green-800"
                                }`}
                              >
                                🌿 {feature}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className={`text-xs opacity-50 mt-1 px-1.5 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>

                  {idx === 0 && messages.length <= 1 && !loading && (
                    <div className="pl-11 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl animate-[fadeIn_0.2s_ease-out]">
                      {SUGGESTIONS.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={index}
                            disabled={loading}
                            onClick={() => {
                              setIsSidebarOpen(false);
                              handleSendMessage(item.text);
                            }}
                            className={`p-3.5 text-left rounded-xl border text-sm font-medium transition-all duration-200 flex flex-col justify-between gap-2 hover:scale-[1.01] ${
                              loading ? "opacity-50 cursor-not-allowed" : ""
                            } ${
                              darkMode ? "border-slate-800 bg-[#1e293b]/40 hover:bg-[#1e293b]" : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-slate-400"><IconComponent className="w-5 h-5" /></span>
                            <span>{item.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 mr-auto max-w-[80%] animate-pulse">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-green-500/10 border border-green-500/20 text-[#22c55e]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`rounded-3xl rounded-bl-lg px-4 py-3.5 flex gap-1 items-center ${
                      darkMode ? "bg-[#1e293b]" : "bg-white border border-slate-200"
                    }`}>
                      <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                    <p className="text-sm mt-1.5 px-1 opacity-60 font-medium tracking-wide">
                      CropSage AI is thinking...
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className={`p-4 md:p-6 sticky bottom-0 transition-all duration-300 ${
            darkMode
              ? "bg-gradient-to-t from-[#0f172a] via-[#0f172a]/95 to-transparent"
              : "bg-gradient-to-t from-white via-white/95 to-transparent"
          }`}>
            <form
              onSubmit={handleFormSubmit}
              className={`max-w-3xl mx-auto border rounded-2xl p-2 flex items-end gap-2 shadow-2xl focus-within:ring-2 focus-within:ring-green-500/20 transition-all duration-300 ${
                darkMode ? "bg-[#111827] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleFormSubmit(e);
                  }
                }}
                disabled={loading}
                className={`flex-1 bg-transparent px-3 py-2 text-base focus:outline-none resize-none placeholder:text-slate-500 max-h-[140px] overflow-y-auto ${
                  loading ? "cursor-not-allowed opacity-60" : ""
                }`}
                placeholder={loading ? "CropSage AI is answering..." : "Ask anything about farming..."}
                aria-label="Ask CropSage AI"
              />
              <button 
                type="submit" 
                disabled={loading || !inputValue.trim()}
                className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-white transition-all duration-300 ${
                  inputValue.trim() && !loading 
                    ? "bg-[#22c55e] hover:bg-green-600 scale-100" 
                    : "bg-slate-700/40 text-slate-500 cursor-not-allowed scale-95"
                }`}
                aria-label="Send message"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </form>
          </div>
        </main>
      </section>

      <Footer />
    </div>
  );
}

export default AIAssistant;