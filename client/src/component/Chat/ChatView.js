import React from "react";

import { ChatkitProvider } from '@pusher/chatkit-client-react';
import './ChatApp.css';
import Chat from './Chat';
import UserListControl from './UserListControl';

const ChatView = ({ chatDetails }) => {
  const {
    instanceLocator,
    tokenProvider,
    userId,
    otherId
} = chatDetails;

  return (
      <div className="ChatApp">
        {userId && otherId ? (
          <>
            <div className="ChatApp__chatwindow">
                <ChatkitProvider
                  instanceLocator={instanceLocator}
                  tokenProvider={tokenProvider}
                  userId={userId}
                >
                  <UserListControl userId={userId} otherId={otherId}/>
                  <Chat otherUserId={otherId}/>
                </ChatkitProvider>
            </div>
          </>
        ) : (
          <h1>Make sure you have userId and otherId set in the query!</h1>
        )}
      </div>
  );
};

export default ChatView;
