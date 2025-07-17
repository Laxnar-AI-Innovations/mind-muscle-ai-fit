import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Zap, Brain } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey champ! 💪 I'm your AI fitness trainer. What's your goal today—building muscle, losing fat, or just feeling healthier?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('openChat', handleOpenChat);
    return () => window.removeEventListener('openChat', handleOpenChat);
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response (in real implementation, this would call ChatGPT API)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue("");
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
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-neon-green hover:from-primary/90 hover:to-neon-green/90 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="lg"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-card/95 backdrop-blur-sm border-border shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-neon-blue/10 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-neon-green rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">FitMind AI</CardTitle>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-muted text-foreground'
                        : 'bg-gradient-to-r from-primary to-neon-green text-white'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-line">{message.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-2">Quick replies:</div>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => setInputValue(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask your AI trainer..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-neon-green hover:from-primary/90 hover:to-neon-green/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Powered by ChatGPT
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;