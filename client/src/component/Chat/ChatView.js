import React from "react";

import { ChatkitProvider } from "@pusher/chatkit-client-react";
import "./ChatApp.css";
import Chat from "./Chat";
import UserListControl from "./UserListControl";

const findMsgCount = (chatList, otherId) => {
  let chat;
  for (let i=0; i<chatList.length; i++){
    chat = chatList[i];
    if (otherId === chat.id || otherId === chat.userId){
      return chat.msgCount;
    }
  }
  return 0;
}

class ChatView extends React.Component {
  state = {
      userId : this.props.chatDetails.userId,
      otherId : this.props.chatDetails.otherId,
      msgCount : 10 //findMsgCount(this.props.chatList, this.props.chatDetails.otherId)
  };

  updateSelectedUser = () => {
    const otherId = this.props.match.params;
    this.setState({
      otherId : otherId,
      //msgCount : findMsgCount(this.props.chatList, otherId)
    })
  }

  saveMsgCount = (count) => {
    this.setState({
      msgCount : count
    })
  }

  render(){
    const { userId, otherId } = this.state;
    return (
      <div className="ChatApp">
        {userId && otherId ? (
          <>
            <div className="ChatApp__chatwindow">
              <ChatkitProvider
                instanceLocator={this.props.chatDetails.instanceLocator}
                tokenProvider={this.props.chatDetails.tokenProvider}
                userId={userId}
              >
                <p>{otherId}</p>
                <UserListControl {...this.state} chatList={this.props.chatList} updateSelectedUser={this.updateSelectedUser} />
                <Chat otherUserId={otherId} msgCount={this.state.msgCount} />
              </ChatkitProvider>
            </div>
          </>
        ) : (
          <h1>Make sure you have userId and otherId set in the query!</h1>
        )}
      </div>
    );
  };
};

export default ChatView;
