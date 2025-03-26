import { sbAppId } from "@/config/sendbirdConfig"
import { SendBirdProvider } from "@sendbird/uikit-react"
import { useRecoilValueLoadable } from "recoil"

import '@sendbird/uikit-react/dist/index.css';
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { useEffect, useState } from "react";
import { userInfo } from "@/recoil/selectors/userSelector";

const ChatChannel = () => {
    const userSelector = useRecoilValueLoadable(userInfo)
    const [channelUrl, setChannelUrl] = useState('');

    const user = {
        userId : userSelector.contents.userId, 
        userName : userSelector.contents.userName
    }

    useEffect(() => {
        const url = localStorage.getItem("channcel.url")
        setChannelUrl(url);

        console.log('userSelector = ', userSelector);
    }, []);

    return (
        <div className="app-container">
        <SendBirdProvider appId={sbAppId} userId={user.userId} nickname={user.userName}>
            <div className="sendbird-app__conversation-wrap" style={{width:400}}>  
                <GroupChannel channelUrl={channelUrl} onChatHeaderActionClick={() => {
                    console.log('onChatHeaderActionClick')                    
                }}/>
            </div>
        </SendBirdProvider>
        </div>
    )
}

export default ChatChannel