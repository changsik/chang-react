import { SendBirdProvider } from "@sendbird/uikit-react"
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList"
import { useState } from "react"
import GroupChannel from "@sendbird/uikit-react/GroupChannel"
import DraggablePopup from "./DraggablePopup"
import DraggableResizablePopup from "./DraggableResizablePopup"

import '@sendbird/uikit-react/dist/index.css';
import { sbAppId } from "@/config/sendbirdConfig"
import { userState } from "@/recoil/atoms/userState"
import { useRecoilValue } from "recoil"

const Chat = () => {    
    const user = useRecoilValue(userState)

    const [channelUrl, setChannelUrl] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="app-container">
        <SendBirdProvider appId={sbAppId} userId={user.userId} nickname={user.userName}>
            <div className="sendbird-app__channellist-wrap">
                <GroupChannelList selectedChannelUrl={channelUrl}
                    onChannelCreated={(channel) => {
                        setChannelUrl(channel.url)
                    }}
                    onChannelSelect={(channel) => {                       
                        setChannelUrl(channel?.url)
                        localStorage.setItem('channcel.url', channel?.url)
                        window.open('/chat/channel', "_blank", "width=400,height=600")
                        
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