import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Brain, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FullPageChatProps {
  onClose: () => void;
}

const FullPageChat = ({ onClose }: FullPageChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey champ! 💪 I'm your AI fitness trainer. What's your goal today—building muscle, losing fat, or just feeling healthier?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('muscle') || input.includes('gain') || input.includes('build')) {
      return "Great choice! 🏋️‍♀️ For muscle building, I recommend:\n\n• 3-4 strength training sessions/week\n• Progressive overload principle\n• 1.6-2.2g protein per kg body weight\n\nBased on your goals, a quality whey protein like MuscleBlaze could really help with recovery. Would you like a specific workout plan?";
    }
    
    if (input.includes('weight') || input.includes('lose') || input.includes('fat')) {
      return "Perfect! 🔥 For weight loss, let's focus on:\n\n• Caloric deficit (300-500 calories below maintenance)\n• Mix of cardio and strength training\n• High protein intake to preserve muscle\n\nI've seen great results when people track their macros. Want me to calculate your daily targets?";
    }
    
    if (input.includes('tired') || input.includes('energy') || input.includes('fatigue')) {
      return "I hear you! 😴 Low energy can really impact workouts. Let's check:\n\n• Are you getting 7-9 hours of sleep?\n• How's your hydration?\n• When did you last check your vitamin levels?\n\nA comprehensive health panel from VitalCheck Labs could reveal if you have any deficiencies affecting your energy. Should we explore this?";
    }
    
    return "That's interesting! 🤔 Tell me more about your current fitness routine and any challenges you're facing. I'm here to help create a personalized plan that fits your lifestyle. What's your biggest fitness challenge right now?";
  };

  const quickReplies = [
    "I want to build muscle",
    "Help me lose weight", 
    "I'm always tired after workouts",
    "Create a meal plan"
  ];

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
                Online
              </div>
            </div>
          </div>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.isBot ? '' : 'flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isBot 
                    ? 'bg-gradient-to-r from-primary to-neon-green' 
                    : 'bg-muted'
                }`}>
                  {message.isBot ? (
                    <Brain className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div className={`flex-1 max-w-2xl ${message.isBot ? '' : 'text-right'}`}>
                  <div className={`inline-block p-4 rounded-lg ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-gradient-to-r from-primary to-neon-green text-white'
                  }`}>
                    <div className="whitespace-pre-line">{message.text}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                    onClick={() => setInputValue(reply)}
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

      {/* Input */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask your AI trainer anything..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
            FitMind.AI can make mistakes. Verify important fitness information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageChat;