import React from "react";
import { TokenProvider } from "@pusher/chatkit-client-react";
import ChatView from "./ChatView";

const instanceLocator = "v1:us1:19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b";

const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b/token"
});

let chatList = [
  {
    id: "bob",
    name: "Bob",
    otherId: "alice",
    otherName: "Alice",
    msgCount : 2,
    // text: "Goodbye",
    // byUser: true,
    // time: "10.00 AM"
  },
  {
    id: "carol",
    name: "Carol",
    otherId: "alice",
    otherName: "Alice",
    msgCount : 1,
    // text: "Carol : Heyo",
    // time: "Yesterday"
  }
];

const findMsgCount = (otherId) => {
  let chat;
  for (let i=0; i<chatList.length; i++){
    chat = chatList[i];
    if (otherId === chat.id || otherId === chat.otherId){
      return chat.msgCount;
    }
  }
  return 0;
}

const setMsgCount = (otherId, count) => {
  let chat;
  for (let i=0; i<chatList.length; i++){
    chat = chatList[i];
    if (otherId === chat.id || otherId === chat.otherId){
      chat.msgCount = count;
      return;
    }
  }
}

class ChatControl extends React.Component {
  state = {
    chatDetails: {
      instanceLocator: instanceLocator,
      tokenProvider: tokenProvider,
      userId: null,
      otherId: null
    },
    chatList : chatList
  };

  async componentDidMount() {
    const response = await fetch(
      `http://172.21.148.170/api/chat/${this.props.url}/user`
    );
    const json = await response.json();
    console.log(json);
    this.setState({ id : json.id,
                    otherId : json.otherId,
                    chatList: json });
  }

  render() {
    const { chatDetails, chatList } = this.state;
    return <ChatView {...this.props} chatDetails={chatDetails} chatList={chatList} findMsgCount={findMsgCount} setMsgCount={setMsgCount} />;
  }
}

export default ChatControl;
