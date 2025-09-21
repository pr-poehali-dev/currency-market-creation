import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  sender: 'user' | 'seller' | 'support';
  content: string;
  timestamp: Date;
  senderName: string;
}

interface ChatDialogProps {
  children: React.ReactNode;
  chatType: 'seller' | 'support';
  chatWith?: string;
}

export default function ChatDialog({ children, chatType, chatWith = 'Поддержка' }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: chatType,
      content: chatType === 'seller' 
        ? 'Здравствуйте! Готов ответить на ваши вопросы о товаре.' 
        : 'Добро пожаловать в службу поддержки! Как я могу вам помочь?',
      timestamp: new Date(Date.now() - 600000),
      senderName: chatWith
    },
    {
      id: '2',
      sender: 'user',
      content: chatType === 'seller' 
        ? 'Сколько времени занимает доставка WoW Gold?' 
        : 'У меня проблема с платежом',
      timestamp: new Date(Date.now() - 300000),
      senderName: 'Вы'
    },
    {
      id: '3',
      sender: chatType,
      content: chatType === 'seller' 
        ? 'Обычно доставка занимает 10-15 минут. Как только оплата пройдет, я сразу передам вам валюту в игре.' 
        : 'Понимаю вашу проблему. Можете описать подробнее, что именно происходит при попытке оплаты?',
      timestamp: new Date(Date.now() - 60000),
      senderName: chatWith
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      senderName: 'Вы'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: chatType,
        content: chatType === 'seller' 
          ? 'Спасибо за вопрос! Я обработаю ваш запрос в ближайшее время.' 
          : 'Спасибо за обращение! Наш специалист рассмотрит вашу проблему.',
        timestamp: new Date(),
        senderName: chatWith
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon 
              name={chatType === 'seller' ? "MessageCircle" : "Headphones"} 
              className="text-primary" 
            />
            <span>
              {chatType === 'seller' ? `Чат с ${chatWith}` : 'Техподдержка'}
            </span>
            {chatType === 'seller' && (
              <Badge variant="default" className="ml-2">
                <Icon name="BadgeCheck" size={12} className="mr-1" />
                Верифицирован
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium">
                      {message.senderName}
                    </span>
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator />

        <div className="flex space-x-2 pt-4">
          <Input
            placeholder="Введите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            className="flex-1"
          />
          <Button onClick={sendMessage} size="sm" className="btn-gaming">
            <Icon name="Send" size={16} />
          </Button>
        </div>

        {chatType === 'support' && (
          <div className="text-xs text-muted-foreground text-center pt-2">
            <Icon name="Clock" size={12} className="inline mr-1" />
            Среднее время ответа: 5 минут
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}