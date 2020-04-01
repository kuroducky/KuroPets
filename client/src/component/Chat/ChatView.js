import React from "react";

import { ChatkitProvider } from "@pusher/chatkit-client-react";
import "./ChatApp.css";
import Chatbox from "./Chatbox";
import UserListControl from "./UserListControl";

class ChatView extends React.Component {

  render(){
    const { userId, otherId } = this.props;
  
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
                <UserListControl userId={userId} otherId={otherId} chatList={this.props.chatList} updateSelectedUser={this.props.updateSelectedUser} />
                <Chatbox otherUserId={otherId} />
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
