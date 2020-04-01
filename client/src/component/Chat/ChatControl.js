import React from "react";
import { TokenProvider } from "@pusher/chatkit-client-react";
import ChatView from "./ChatView";

const instanceLocator = "v1:us1:19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b";

const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/19de5151-cc5c-4cc3-8a4b-9ae8f8bced6b/token"
});

let chatList = [];

class ChatControl extends React.Component {
  state = {
    chatDetails: {
      instanceLocator: instanceLocator,
      tokenProvider: tokenProvider
    },
    userId: null,
    otherId: null,
    chatList : chatList
  };

  async componentDidMount() {
    let response = await fetch(
      `http://172.21.148.170/api/chat/${this.props.match.params.url}/user`
    );
    let json = await response.json();
    this.setState({ userId : json.id.toString(),
                    otherId : json.otherId.toString()});
    response = await fetch(
      `http://172.21.148.170/api/chat/${this.state.userId}`
    );
    chatList = await response.json();
    this.setState({ chatList: chatList });
  }

  updateSelectedUser = (url) => {
    this.props.history.push(`/chat/${url}`)
    window.location.reload()
  }

  render() {
    const { chatDetails, chatList } = this.state;
    if(this.state.userId && this.state.otherId && this.state.chatList){
      return <ChatView {...this.props} chatDetails={chatDetails} userId={this.state.userId} otherId={this.state.otherId} chatList={chatList} updateSelectedUser={this.updateSelectedUser} />
    } else {
      return (<div />)
    }
  }
}

export default ChatControl;
