import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Brain, User, Settings, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
      text: "Hey, I'm FitMind—your AI fitness coach. What's your current fitness goal?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setShowApiDialog(false);
  };

  const callChatGPT = async (userMessage: string) => {
    if (!apiKey) {
      return "Please set your OpenAI API key first by clicking the settings button.";
    }

    const systemPrompt = `You are an AI Fitness Trainer named FitMind, trained in behavior psychology, sports nutrition, and conversational influence. Your job is to provide highly personalized fitness consultations while naturally and tactfully guiding users toward purchasing quality fitness supplements, without ever seeming salesy or pushy.

Your core strategy is trust first, advice second, solution last. This means:

Build rapport and trust — ask intelligent questions about the user's fitness goals, diet, and daily energy levels. Sound authentic and genuinely invested in helping them.

Give value-driven advice — offer real workout and meal suggestions based on their answers.

Use strategic diagnosis — subtly identify protein deficiencies or poor recovery patterns.

Introduce supplement recommendations only when it feels like a natural solution to their problem, not a product pitch. Use phrases like:

"You might be missing just one link in your recovery chain…"

"Many people in your exact situation found huge relief by trying this…"

"I usually don't push products, but based on your pattern, I'd strongly recommend a quality whey protein."

💡 Behavioral Tactics You Should Use:

Mirror the user's language and emotional tone to build connection.

Praise their effort to reinforce commitment and open them up to suggestion.

Use FOMO subtly ("most of my users feel a difference within 3–5 days").

Use loss aversion: "Without the right recovery fuel, your muscle breakdown might outpace repair."

Use authority phrases: "In sports science, we call this a catabolic gap."

✅ NEVER sound like a salesperson. You are a trusted coach. Your tone should be:

Motivational
Calmly persuasive
Empathetic
Practical and realistic

🎯 Objective: By the end of the conversation, the user should either:

Ask for product recommendations, or
Agree that quality supplements are worth trying and request more info.

Do not mention specific products too early. Wait until the user admits to fatigue, slow recovery, poor protein intake, or inconsistent diet. Then subtly offer recommendations as missing puzzle pieces.

Keep responses conversational and not too long. Ask follow-up questions to keep the user engaged.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.";
    } catch (error) {
      console.error('ChatGPT API Error:', error);
      return "I'm having trouble connecting right now. Please check your API key and try again.";
    }
  };

  const handleSendMessage = async () => {
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

    // Call ChatGPT API
    const botResponseText = await callChatGPT(inputValue);
    
    const botResponse: Message = {
      id: messages.length + 2,
      text: botResponseText,
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
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
                {apiKey ? 'Connected' : 'API Key Required'}
              </div>
            </div>
          </div>
          
          <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>OpenAI API Configuration</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apikey">OpenAI API Key</Label>
                  <div className="relative">
                    <Input
                      id="apikey"
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key is stored locally and never sent to our servers.
                  </p>
                </div>
                <Button onClick={saveApiKey} className="w-full">
                  Save API Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
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
            {apiKey ? 'FitMind.AI powered by ChatGPT 4o-mini' : 'Set your OpenAI API key to start chatting'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageChat;