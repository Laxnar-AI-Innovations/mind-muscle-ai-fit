import FullPageChat from "./FullPageChat";

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  return <FullPageChat onClose={onClose} />;
};

export default ChatBot;