// import { useSendbird } from '@sendbird/uikit-react';
// import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
// import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';

import { App as SendbirdApp } from '@sendbird/uikit-react';

import '@sendbird/uikit-react/dist/index.css';

const SendbirdBasic = () => {
    const userId = 'kcsic' // deliveryPersonId: 'delivery', // TODO Replace 'YOUR_DELIVERY_PERSON_ID' with the actual delivery person's user ID
    return (
        // <SendbirdProvider appId="3E4C38E4-4EB5-4089-AA63-72F8B96E36DA" userId={userId}>
        //   <div style={{ display: 'flex', height: '100vh' }}>
            
        //   </div>
        // </SendbirdProvider>
        <SendbirdApp
          appId={'3E4C38E4-4EB5-4089-AA63-72F8B96E36DA'}
          userId={userId}
          // accessToken={'7434dbc2fda78b48728a57ea289ca0aa2f93ccef'} // Optional, but recommended
        />
    );
};

export default SendbirdBasic;