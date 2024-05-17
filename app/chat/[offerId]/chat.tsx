"use client";
import React, { useState, useEffect } from 'react';
//@ts-ignore
import { Types, Realtime } from 'ably';
import { AblyProvider, useChannel, useConnectionStateListener, ChannelProvider } from 'ably/react';
import { useSearchParams } from 'next/navigation';
import { sendMessage } from '@/server/messages'; // Importing the server action

interface ChatClientProps {
  mode: string;
  offerId: string;
  senderName: string;
  senderProfileImage: string;
  senderUuid: string;
  previousMessages: Types.Message[]; // Add previousMessages to the props
  apiKey: string;
}

export default function ChatClient({ mode, offerId, senderName, senderProfileImage, senderUuid, previousMessages, apiKey }: ChatClientProps) {
  const client = new Realtime({ key: apiKey });

  return (
    <AblyProvider client={client}>
      <ChatContainer 
        mode={mode} 
        offerId={offerId} 
        senderName={senderName} 
        senderProfileImage={senderProfileImage} 
        senderUuid={senderUuid} 
        previousMessages={previousMessages} // Pass previousMessages as a prop
      />
    </AblyProvider>
  );
}

interface ChatContainerProps {
  mode: string;
  offerId: string;
  senderName: string;
  senderProfileImage: string;
  senderUuid: string;
  previousMessages: Types.Message[]; // Add previousMessages to the props
}

function ChatContainer({ mode, offerId, senderName, senderProfileImage, senderUuid, previousMessages }: ChatContainerProps) {
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
        senderUuid={senderUuid}
        previousMessages={previousMessages} // Pass previousMessages as a prop
      />
    </ChannelProvider>
  );
}

interface ChatProps {
  offerId: string;
  senderName: string;
  senderProfileImage: string;
  senderUuid: string;
  previousMessages: Types.Message[]; // Add previousMessages to the props
}

function Chat({ offerId, senderName, senderProfileImage, senderUuid, previousMessages }: ChatProps) {
  const [messages, setMessages] = useState<Types.Message[]>(previousMessages); // Initialize state with previousMessages
  const [messageText, setMessageText] = useState('');
  const [localMessageIds, setLocalMessageIds] = useState<Set<string>>(new Set());

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  const { channel } = useChannel(`chat-${offerId}`, (message: Types.Message) => {
    // Check if the message is already in the state by comparing ids
    setMessages(previousMessages => {
      if (previousMessages.find(msg => msg.id === message.id)) {
        return previousMessages;
      }
      return [...previousMessages, message];
    });
  });

  const handleSendMessage = async () => {
    if (messageText.trim() !== '') {
      const messageId = `local-${Date.now()}`; // Local ID until confirmed by the server

      try {
        // Send message to the server
        await sendMessage(senderUuid, messageText, offerId);

        // Publish message to the Ably channel
        channel.publish('chat-message', {
          id: messageId,
          text: messageText,
          clientId: senderUuid,
          userId: senderName
        });

        // Clear the input box
        setMessageText('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
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
          <div key={index} className={`mb-2 p-2 rounded bg-white text-left`}>
            <strong>{message.data.userId}: </strong>
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
        <button onClick={handleSendMessage} className="p-2 bg-primary text-white rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
}
