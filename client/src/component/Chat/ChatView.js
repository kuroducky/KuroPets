import React from "react";

import { ChatkitProvider } from "@pusher/chatkit-client-react";
import "./ChatApp.css";
import Chatbox from "./Chatbox";
import UserListControl from "./UserListControl";

class ChatView extends React.Component {
  state = {
      userId : this.props.chatDetails.userId,
      otherId : this.props.chatDetails.otherId,
      msgCount : this.props.findMsgCount(this.props.match.params.otherId)
  };

  saveMsgCount = (count, otherId=null) => {
    if (otherId != null){     // Changing chat
      count = this.props.findMsgCount(otherId);
    }
    else {                    // Same chat, posting more messages
      otherId = this.state.otherId
      this.props.setMsgCount(otherId, count);
    }
    this.setState({
      msgCount : count
    });
  }

  updateSelectedUser = () => {
    const otherId = this.props.match.params.otherId;
    this.setState({ otherId : otherId });
    this.saveMsgCount(0, otherId);
  }

  render(){
    const { userId, otherId, msgCount } = this.state;
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
                <Chatbox otherUserId={otherId} msgCount={msgCount} saveMsgCount={this.saveMsgCount} />
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
