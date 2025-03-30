import { SendBirdProvider } from "@sendbird/uikit-react"
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList"
import { useState } from "react"
import GroupChannel from "@sendbird/uikit-react/GroupChannel"
import DraggablePopup from "./DraggablePopup"
import DraggableResizablePopup from "./DraggableResizablePopup"

import '@sendbird/uikit-react/dist/index.css';
import { sbAppId, sendbird } from "@/config/sendbirdConfig"
import { userState } from "@/recoil/atoms/userState"
import { useRecoilValue } from "recoil"

// import styles from './styles/Chat.module.scss'
import {} from './App.css'

const Chat = () => {    
    const user = useRecoilValue(userState)

    const [channelUrl, setChannelUrl] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    const sendFileMessage = (channelUrl, fileUrl) => {
        sendbird.GroupChannel.getChannel(channelUrl, (channel, error) => {
          if (error) {
            console.error('Error getting channel:', error);
            return;
          }
      
          const params = new sendbird.FileMessageParams();
          params.fileUrl = fileUrl;
          params.fileName = 'uploaded_file';
          params.fileSize = 12345; // 파일 크기
          params.mimeType = 'image/jpeg'; // MIME 타입
      
          channel.sendFileMessage(params, (message, error) => {
            if (error) {
              console.error('Error sending file message:', error);
            } else {
              console.log('File message sent:', message);
            }
          });
        });
      };

    return (
        <div className="app-container">
        <SendBirdProvider appId={sbAppId} userId={user.userId} nickname={user.userName}>
            <div className="sendbird-app__channellist-wrap">
                <GroupChannelList selectedChannelUrl={channelUrl}
                    onChannelCreated={(channel) => {
                        setChannelUrl(channel.url)
                    }}
                    onChannelSelect={(channel) => { 
                        console.log(channel)                      
                        if(channel){
                            setChannelUrl(channel?.url)
                            localStorage.setItem('channcel.url', channel?.url)
                            window.open('/chat/channel', "_blank", "width=400,height=600")        
                        }
                    }} 
                    disableAutoSelect={true} >
                    
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

                <div>
                    <h1>React Draggable Popup Example</h1>
                    <DraggablePopup />
                    <DraggableResizablePopup />
                </div>

              {/* <ChannelSettings
                channelUrl={channelUrl}
                onCloseClick={() => {
                  console.log('111');
                  setShowSettings(false)
                }}
              /> */}
            </div>
          )}
        </SendBirdProvider>
        </div>
    )
}

export default Chat