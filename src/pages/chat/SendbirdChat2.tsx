import {PropsWithChildren, useState} from 'react';

import {ChannelSettings, useSendbirdStateContext} from '@sendbird/uikit-react';
import {GroupChannel} from '@sendbird/uikit-react/GroupChannel';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import '@sendbird/uikit-react/dist/index.css';
import './App.css';
import './test.css';
import GroupChannelList from '@sendbird/uikit-react/GroupChannelList';

const orderDetails = {
  orderNumber: 'Order #12345',
  items: ['Pizza', 'Coke'],
  status: 'In transit',
  deliveryPersonId: 'delivery', // TODO Replace 'YOUR_DELIVERY_PERSON_ID' with the actual delivery person's user ID
};

const SendbirdChat2 = () => {
  const [userId, setUserId] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [showChat, setShowChat] = useState(false); // State to toggle the visibility of the chat
  const [channelUrl, setChannelUrl] = useState(''); // State to store the channel URL
  const [showSettings, setShowSettings] = useState(false)

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (userId.trim()) setShowLogin(false);
  };

  const handleCreateChannel = (url: string) => {
    console.log('Channel created:', url);
    setChannelUrl(url);
    setShowChat(true);
  };

  const renderLoginForm = () => {
    return (
      <form className={'login-form'} onSubmit={handleLogin}>
        <input type="text" placeholder="Enter your user ID" value={userId} onChange={(e) => setUserId(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    );
  };

  const renderApp = () => {
    const APP_ID = '3E4C38E4-4EB5-4089-AA63-72F8B96E36DA'; // TODO Replace 'YOUR_APP_ID' with the actual Sendbird application ID
    return (
      <div className="app-container">
        <SendbirdProvider appId={APP_ID} userId={userId}>
          <OrderStatus orderDetails={orderDetails}>
            {showChat ? (
              <button onClick={() => setShowChat(false)}>{'Close'}</button>
            ) : (
              <ChatButton userId={userId} deliveryPersonId={orderDetails.deliveryPersonId}
                          onCreateChannel={handleCreateChannel}/>
            )}
          </OrderStatus>
          <div className="sendbird-app__channellist-wrap">
            <GroupChannelList selectedChannelUrl={channelUrl}
              onChannelCreated={(channel) => {
                setChannelUrl(channel.url)
              }}
              onChannelSelect={(channel) => {
                setChannelUrl(channel?.url)
              }}>
            </GroupChannelList>
          </div>
          <div className="sendbird-app__conversation-wrap" style={{width:400}}>
            <GroupChannel channelUrl={channelUrl} onChatHeaderActionClick={() => {
                        setShowSettings(true)
                      }}/>

          </div>

          {showSettings && (
            <div className="sendbird-app__settingspanel-wrap" style={{background:'#999999', width:300}}>
                커스터마이징 레이어
                <button style={{width:50}} onClick={()=>{
                   setShowSettings(false)   
                }}>Close</button>
              {/* <ChannelSettings
                channelUrl={channelUrl}
                onCloseClick={() => {
                  console.log('111');
                  setShowSettings(false)
                }}
              /> */}
            </div>
          )}
        </SendbirdProvider>
      </div>
    );
  };

  return <div className="App">{showLogin ? renderLoginForm() : renderApp()}</div>;
};

const useCreateChannel = (userId: string, deliveryPersonId: string, onCreateChannel: (url: string) => void) => {
  // To use the context, the component should be wrapped in the SendbirdProvider.
  const {stores} = useSendbirdStateContext(); // Access the Sendbird state context
  const sdk = stores.sdkStore.sdk; // Get the Sendbird SDK instance

  return async () => {
    // Ensure that SDK is initialized
    if (!sdk || !sdk.groupChannel) {
      console.log('SDK not initialized');
      return;
    }

    // Use the SDK to create a new group channel
    const params = {
      invitedUserIds: [userId, deliveryPersonId],
      isDistinct: true, // Reuse the channel if it already exists
    };

    // In production, you should handle the error using try-catch
    const channel = await sdk.groupChannel.createChannel(params);
    onCreateChannel(channel.url);
  };
};

type ChatButtonProps = { userId: string; deliveryPersonId: string; onCreateChannel: (url: string) => void };
const ChatButton = ({userId, deliveryPersonId, onCreateChannel}: ChatButtonProps) => {
  const onStartChat = useCreateChannel(userId, deliveryPersonId, onCreateChannel);
  return <button onClick={onStartChat}>{'Chat with Delivery Person'}</button>;
};

type OrderStatusProps = { orderDetails: typeof orderDetails };
const OrderStatus = ({orderDetails, children}: PropsWithChildren<OrderStatusProps>) => {
  return (
    <div className="order-container">
      <div className="order-body">
        <div className="order-number">{orderDetails.orderNumber}</div>
        <div className="order-details">
          <p>Details:</p>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="order-status">Status: {orderDetails.status}</div>
        {children}
      </div>
    </div>
  );
};

export default SendbirdChat2;