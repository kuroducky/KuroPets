import React from "react";
import { TokenProvider } from "@pusher/chatkit-client-react";
import ChatView from "./ChatView";

const instanceLocator = "v1:us1:19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b";

const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b/token"
});

const chatList = [
  {
    id: "bob",
    name: "Bob",
    otherId: "alice",
    otherName: "Alice",
    msgCount : 3,
    // text: "Goodbye",
    // byUser: true,
    // time: "10.00 AM"
  },
  {
    id: "carol",
    name: "Carol",
    otherId: "alice",
    otherName: "Alice",
    msgCount : 5,
    // text: "Carol : Heyo",
    // time: "Yesterday"
  }
];

class ChatControl extends React.Component {
  state = {
    chatDetails: {
      instanceLocator: instanceLocator,
      tokenProvider: tokenProvider,
      userId: this.props.match.params.userId,
      otherId: this.props.match.params.otherId
    },
    chatList : chatList
  };

  render() {
    const { chatDetails, chatList } = this.state;
    return <ChatView chatDetails={chatDetails} chatList={chatList} {...this.props} />;
  }
}

export default ChatControl;
