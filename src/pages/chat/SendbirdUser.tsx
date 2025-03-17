import { useState } from 'react';
import SendBird from 'sendbird';

const SendbirdUser = () => {
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');

    const sb = new SendBird({ appId: '3E4C38E4-4EB5-4089-AA63-72F8B96E36DA' }); // Sendbird Application ID를 입력하세요.

    const connectUser = (userId: string, nickname: string) => {
        sb.connect(userId, (user, error) => {
            if (error) {
            console.error('Sendbird connection error:', error);
            return;
            }
            console.log('Sendbird connected as:', user);

            // 사용자 정보를 업데이트(선택 사항)
            sb.updateCurrentUserInfo(nickname, null, (response, err) => {
            if (err) {
                console.error('Error updating user info:', err);
                return;
            }
            console.log('User info updated:', response);
            });
        });
    };

    const handleConnect = () => {
        if (userId && nickname) {
          connectUser(userId, nickname);
        } else {
          alert('User ID와 Nickname을 입력해주세요.');
        }
    };

    return (
        <div>
            <h1>Sendbird 사용자 연결</h1>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={handleConnect}>Connect</button>
        </div>
    )
}

export default SendbirdUser