import './App.css'

import SBProvider from '@sendbird/uikit-react/SendbirdProvider'
import '@sendbird/uikit-react/dist/index.css'
import CustomizedApp from './CustomizedApp'

function SendbirdProv() {
  return (
    <SBProvider appId={'3E4C38E4-4EB5-4089-AA63-72F8B96E36DA'} userId={'kcsic'} nickname={'김창식3'}>
      <CustomizedApp />
    </SBProvider>
  )
}

export default SendbirdProv