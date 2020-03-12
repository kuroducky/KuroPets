import React from "react";
import { ChatkitProvider, TokenProvider } from "@pusher/chatkit-client-react";
import ChatView from "./ChatView";

const instanceLocator = "v1:us1:19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b";

const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b/token"
});

class ChatControl extends React.Component {
  state = {
    chatDetails: {
      instanceLocator: instanceLocator,
      tokenProvider: tokenProvider,
      userId: this.props.match.params.userId,
      otherId: this.props.match.params.otherId
    }
  };

  render() {
    const { chatDetails } = this.state;
    return <ChatView chatDetails={chatDetails} {...this.props} />;
  }
}

export default ChatControl;
