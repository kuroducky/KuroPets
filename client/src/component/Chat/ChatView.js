import React from "react";

import { ChatkitProvider } from "@pusher/chatkit-client-react";
import "./ChatApp.css";
import Chat from "./Chat";
import UserListControl from "./UserListControl";

class ChatView extends React.Component {
  state = {
      userId : this.props.chatDetails.userId,
      otherId : this.props.chatDetails.otherId,
      msgCount : 0
  };

  updateSelectedUser = () => {
    const otherId = this.props.match.params;
    this.setState(otherId);
    this.setState({
      msgCount : 0
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
                <UserListControl {...this.state} chatList={this.props.chatList} updateSelectedUser={this.updateSelectedUser} />
                <Chat otherUserId={otherId} msgCount={this.state.msgCount} saveMsgCount={this.saveMsgCount} />
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
