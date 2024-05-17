"use client";
import React, { useState } from 'react';
//@ts-ignore
import { Types, Realtime } from 'ably';
import { AblyProvider, useChannel, useConnectionStateListener, ChannelProvider } from 'ably/react';
import { useSearchParams } from 'next/navigation';

interface ChatClientProps {
  mode: string;
  offerId: string;
  senderName: string;
  senderProfileImage: string;
}

export default function ChatClient({ mode, offerId, senderName, senderProfileImage }: ChatClientProps) {
  const client = new Realtime({ key: 'RH7D4A.QYAVVA:dQx2mn0Bo1RCAZuBNTffgCOdEzpANYH7fESxXdIGRYA' });

  return (
    <AblyProvider client={client}>
      <ChatContainer 
        mode={mode} 
        offerId={offerId} 
        senderName={senderName} 
        senderProfileImage={senderProfileImage} 
      />
    </AblyProvider>
  );
}

interface ChatContainerProps {
  mode: string;
  offerId: string;
  senderName: string;
  senderProfileImage: string;
}

function ChatContainer({ mode, offerId, senderName, senderProfileImage }: ChatContainerProps) {
  const searchParams = useSearchParams();

  if (!offerId) {
    return <div>Loading...</div>;
  }

  return (
    <ChannelProvider channelName={`chat-${offerId}`}>
      <Chat 
        offerId={offerId} 
        senderName={senderName} 
        senderProfileImage={senderProfileImage} 
      />
    </ChannelProvider>
  );
}

interface ChatProps {
  offerId: string;
  senderName: string;
  senderProfileImage: string;
}

function Chat({ offerId, senderName, senderProfileImage }: ChatProps) {
  const [messages, setMessages] = useState<Types.Message[]>([]);
  const [messageText, setMessageText] = useState('');

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  const { channel } = useChannel(`chat-${offerId}`, (message: Types.Message) => {
    setMessages(previousMessages => [...previousMessages, message]);
  });

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      channel.publish('chat-message', { text: messageText, userId: senderName });
      setMessageText('');
    }
  };

  return (
    <div className='flex flex-col items-center mt-24'>
      <div className="flex items-center mb-5">
        <img src={senderProfileImage} alt={`${senderName}'s profile`} className="w-12 h-12 rounded-full mr-3" />
        <h2 className="text-lg font-semibold">{senderName}</h2>
      </div>
      <div className="w-full max-w-lg bg-gray-100 rounded-lg p-4 shadow-md overflow-y-auto" style={{ maxHeight: '300px' }}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 p-2 rounded ${message.data.userId === senderName ? 'bg-blue-200 text-right' : 'bg-white text-left'}`}>
            <strong>{message.data.userId === senderName ? 'You' : message.data.userId}: </strong>
            {message.data.text}
          </div>
        ))}
      </div>
      <div className="flex items-center w-full max-w-lg mt-3">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg"
        />
        <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}
