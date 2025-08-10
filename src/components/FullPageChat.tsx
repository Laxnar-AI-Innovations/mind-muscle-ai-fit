// FullPageChat.tsx - AI Wellness Chat with structured JSON responses
// - Uses structured JSON responses from chat-with-ai function
// - Triggers ProductRecommendation based on showRecommendation flag
// - No post-processing needed, direct integration with AI responses

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Brain, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import ProductRecommendation from "./ProductRecommendation";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FullPageChatProps {
  onClose: () => void;
}

const FullPageChat = ({ onClose }: FullPageChatProps) => {
  const { user, signOut } = useAuth();
  const { firstName } = useUserProfile();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showProductRecommendation, setShowProductRecommendation] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [currentGoal, setCurrentGoal] = useState<string | null>(null);
  const [recommendationShownForConversation, setRecommendationShownForConversation] = useState(false);
  const [waitingForRecommendationConsent, setWaitingForRecommendationConsent] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset recommendation flags when conversation changes
  useEffect(() => {
    setRecommendationShownForConversation(false);
    setShowProductRecommendation(false);
    setWaitingForRecommendationConsent(false);
  }, [conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showProductRecommendation]);

  // Fire recShown once when component becomes visible
  useEffect(() => {
    if (showProductRecommendation && (window as any).FitTrack && !sessionStorage.getItem("rec_shown_once")) {
      (window as any).FitTrack.recShown("supplement", 1);
      sessionStorage.setItem("rec_shown_once", "1");
    }
  }, [showProductRecommendation]);

  // Load chat history when component mounts
  useEffect(() => {
    if (user) {
      loadChatHistory();
    } else {
      // Guest welcome
      setMessages([
        {
          id: "welcome",
          text: "Hi, I'm FitMind—your AI wellness guide. I'm here to help with sleep, recovery, energy, and more. What's one thing you've been struggling with lately—fatigue, stress, soreness, or something else?",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  }, [user]);

  const loadChatHistory = async () => {
    if (!user) return;
    try {
      // Get or create conversation
      let { data: conversations, error: convError } = await supabase
        .from("chat_conversations")
        .select("id")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1);

      if (convError) {
        console.error("Error loading conversations:", convError);
        return;
      }

      let currentConversationId: string;

      if (conversations && conversations.length > 0) {
        currentConversationId = conversations[0].id;
      } else {
        const { data: newConversation, error: createError } = await supabase
          .from("chat_conversations")
          .insert({
            user_id: user.id,
            title: "Fitness Chat",
          })
          .select()
          .single();

        if (createError) {
          console.error("Error creating conversation:", createError);
          return;
        }

        currentConversationId = newConversation.id;

        const welcomeMessage = firstName
          ? `Hi ${firstName}, I'm FitMind—your AI wellness guide. I'm here to help with sleep, recovery, energy, and more. What's one thing you've been struggling with lately—fatigue, stress, soreness, or something else?`
          : "Hi, I'm FitMind—your AI wellness guide. I'm here to help with sleep, recovery, energy, and more. What's one thing you've been struggling with lately—fatigue, stress, soreness, or something else?";

        await supabase.from("chat_messages").insert({
          conversation_id: currentConversationId,
          content: welcomeMessage,
          is_bot: true,
        });
      }

      setConversationId(currentConversationId);

      const { data: messageData, error: msgError } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", currentConversationId)
        .order("created_at", { ascending: true });

      if (msgError) {
        console.error("Error loading messages:", msgError);
        return;
      }

      const formattedMessages: Message[] = messageData.map((msg) => ({
        id: msg.id,
        text: msg.content,
        isBot: msg.is_bot,
        timestamp: new Date(msg.created_at),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error in loadChatHistory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMessage = async (content: string, isBot: boolean) => {
    if (!user || !conversationId) return null;
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .insert({
          conversation_id: conversationId,
          content,
          is_bot: isBot,
        })
        .select()
        .single();

      if (error) {
        console.error("Error saving message:", error);
        return null;
      }
      return data.id;
    } catch (error) {
      console.error("Error in saveMessage:", error);
      return null;
    }
  };

  const callAI = async (userMessage: string): Promise<{ response: string; showRecommendation: boolean }> => {
    try {
      const conversationHistory = messages.slice(1).map((msg) => ({
        role: msg.isBot ? "assistant" : "user",
        content: msg.text,
      }));

      const { data, error } = await supabase.functions.invoke("chat-with-ai", {
        body: {
          message: userMessage,
          conversationHistory,
        },
      });

      if (error) {
        console.error("❌ Supabase function error:", error);
        return {
          response: "I'm having trouble connecting right now. Please try again in a moment.",
          showRecommendation: false
        };
      }

      console.log('📦 Raw supabase function response:', data);
      console.log('📤 Data fields:', Object.keys(data || {}));
      console.log('🔍 showRecommendation value:', data?.showRecommendation, 'type:', typeof data?.showRecommendation);

      return {
        response: data.response,
        showRecommendation: data.showRecommendation || false
      };
    } catch (error) {
      console.error("Error calling chat function:", error);
      return {
        response: "I'm having trouble connecting right now. Please try again in a moment.",
        showRecommendation: false
      };
    }
  };

  // Check if user message indicates consent for recommendations
  const checkForRecommendationConsent = (messageText: string): boolean => {
    const lowerMessage = messageText.toLowerCase().trim();
    const positiveResponses = ['yes', 'yeah', 'sure', 'ok', 'okay', 'please', 'show me', 'i would like', 'that would be great', 'sounds good'];
    const negativeResponses = ['no', 'nah', 'not now', 'maybe later', 'not interested'];
    
    // Check for positive responses
    if (positiveResponses.some(response => lowerMessage.includes(response))) {
      return true;
    }
    
    // Check for negative responses
    if (negativeResponses.some(response => lowerMessage.includes(response))) {
      setWaitingForRecommendationConsent(false);
      return false;
    }
    
    return false;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageText = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Track user message count
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);

    // Check if user is responding to recommendation consent request
    if (waitingForRecommendationConsent) {
      const userConsented = checkForRecommendationConsent(messageText);
      console.log('🎯 User consent check:', userConsented, 'for message:', messageText);
      
      if (userConsented && !recommendationShownForConversation) {
        console.log('🚀 User consented! Showing product recommendation');
        setShowProductRecommendation(true);
        setRecommendationShownForConversation(true);
        setWaitingForRecommendationConsent(false);
      } else if (!userConsented) {
        console.log('❌ User declined recommendation');
        setWaitingForRecommendationConsent(false);
      }
    }

    // Pixel events
    if (newCount === 1 && (window as any).FitTrack) {
      (window as any).FitTrack.chatStart(currentGoal);
    }
    if ((window as any).FitTrack && typeof (window as any).FitTrack.qualifiedChat === 'function') {
      (window as any).FitTrack.qualifiedChat(newCount, currentGoal);
    }

    // Save user message
    const userMessageId = await saveMessage(messageText, false);
    const userMessage: Message = {
      id: userMessageId || `temp-user-${Date.now()}`,
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Call AI
    const aiResult = await callAI(messageText);
    console.log('🤖 AI response received:', JSON.stringify(aiResult, null, 2));
    console.log('🔍 Raw showRecommendation value:', aiResult.showRecommendation, 'type:', typeof aiResult.showRecommendation);

    const { response: botText, showRecommendation } = aiResult;
    const shouldShow = Boolean(showRecommendation);
    
    console.log('📝 Bot message text:', botText);
    console.log('🎯 Show recommendation flag:', shouldShow, typeof shouldShow);

    // Save bot message
    const botMessageId = await saveMessage(botText, true);
    const botResponse: Message = {
      id: botMessageId || `temp-bot-${Date.now()}`,
      text: botText,
      isBot: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);

    // Check if AI is asking for recommendation consent (instead of showing immediately)
    if (shouldShow && !recommendationShownForConversation) {
      console.log('🎯 AI is asking for recommendation consent');
      setWaitingForRecommendationConsent(true);
    }
  };

  const quickReplies = [
    "I'm feeling stressed and anxious",
    "I have trouble sleeping",
    "I experience chronic fatigue",
    "How can I reduce inflammation?",
    "Help with pain management",
    "Improve my emotional balance",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading chat history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-neon-green rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">FitMind AI</h1>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                {user ? "Chat History Enabled" : "Guest Mode"}
              </div>
            </div>
          </div>

          {user && (
            <Button
              variant="ghost"
              onClick={async () => {
                await signOut();
                onClose();
              }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.isBot ? "" : "flex-row-reverse"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? "bg-gradient-to-r from-primary to-neon-green" : "bg-muted"
                  }`}
                >
                  {message.isBot ? <Brain className="w-4 h-4 text-white" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`flex-1 max-w-2xl ${message.isBot ? "" : "text-right"}`}>
                  <div
                    className={`inline-block p-4 rounded-lg ${
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-gradient-to-r from-primary to-neon-green text-white"
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.text}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-neon-green flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 max-w-2xl">
                  <div className="inline-block p-4 rounded-lg bg-muted">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="mt-8">
              <div className="text-sm text-muted-foreground mb-3">Quick replies:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => {
                      setInputValue(reply);
                      // Track goal selection
                      if ((window as any).FitTrack) {
                        const goalMap: Record<string, string> = {
                          "I'm feeling stressed and anxious": "stress",
                          "I have trouble sleeping": "sleep",
                          "I experience chronic fatigue": "energy",
                          "How can I reduce inflammation?": "inflammation",
                          "Help with pain management": "pain",
                          "Improve my emotional balance": "emotional_balance",
                        };
                        const goal = goalMap[reply];
                        if (goal) {
                          setCurrentGoal(goal);
                          (window as any).FitTrack.goalSelect(goal);
                        }
                      }
                    }}
                    className="text-sm"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Recommendation */}
      {showProductRecommendation && (
        <div className="border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="relative">
              <button
                onClick={() => {
                  console.log('❌ Product recommendation dismissed');
                  setShowProductRecommendation(false);
                }}
                className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-background/80 hover:bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label="Close recommendation"
              >
                ✕
              </button>
              <ProductRecommendation onLinkClick={() => console.log("Product link clicked")} />
            </div>
          </div>
        </div>
      )}

      {/* Debug Test Button - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-2 flex gap-2">
            <button 
              onClick={() => {
                console.log('🧪 Manual recommendation test - showing');
                setShowProductRecommendation(true);
              }}
              className="text-xs bg-yellow-500 text-black px-2 py-1 rounded"
            >
              Show Recommendation
            </button>
            <button 
              onClick={() => {
                console.log('🧪 Manual recommendation test - hiding');
                setShowProductRecommendation(false);
              }}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded"
            >
              Hide Recommendation
            </button>
            <button 
              onClick={() => {
                console.log('🧪 Reset recommendation state');
                setShowProductRecommendation(false);
                setRecommendationShownForConversation(false);
                setWaitingForRecommendationConsent(false);
              }}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
              Reset State
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask your AI trainer anything..."
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              className="flex-1 bg-background border-border"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-primary to-neon-green hover:from-primary/90 hover:to-neon-green/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            FitMind AI powered by advanced AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageChat;
