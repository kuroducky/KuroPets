import React from "react";
import { Button, Row, Col, Carousel, Typography, Avatar, Tooltip } from "antd";
import FittedImage from "react-fitted-image";
import {
  UserOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  QqOutlined,
  CalendarOutlined,
  DeleteTwoTone,
  CheckCircleTwoTone,
  EditTwoTone,
  SmileOutlined
} from "@ant-design/icons";


import { ChatkitProvider, TokenProvider } from '@pusher/chatkit-client-react';
import './ChatApp.css';
import Chat from './Chat';
import UserListControl from './UserListControl';
import chatkitLogo from './chatkit-logo.svg';

const { Fragment } = React;
const { Text, Title } = Typography;
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
