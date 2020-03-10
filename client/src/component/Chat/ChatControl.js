import React from "react";
import { ChatkitProvider, TokenProvider } from '@pusher/chatkit-client-react';
import ChatView from "./ChatView";

const instanceLocator = 'v1:us1:19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b';

const tokenProvider = new TokenProvider({
  url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b/token',
});

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const otherId = urlParams.get('otherId');

const chatDetails = {
    instanceLocator : instanceLocator,
    tokenProvider : tokenProvider,
    userId : userId,
    otherId : otherId
};

class ChatControl extends React.Component {
  state = {
    id: this.props.match.params.id,
    chatDetails: chatDetails
  };

  render() {
    const { chatDetails } = this.state;
    return <ChatView chatDetails={chatDetails} />;
  }
}

export default ChatControl;
