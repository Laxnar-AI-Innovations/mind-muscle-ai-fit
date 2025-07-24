-- Revert RLS policy to original version
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;

CREATE POLICY "Users can create messages in their conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (EXISTS ( SELECT 1
   FROM chat_conversations
  WHERE ((chat_conversations.id = chat_messages.conversation_id) AND (chat_conversations.user_id = auth.uid()))));