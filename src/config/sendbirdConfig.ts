import SendBird from "sendbird";

export const sendbird = new SendBird({ appId: import.meta.env.VITE_SENDBIRD_APP_ID});
export const sbAppId = import.meta.env.VITE_SENDBIRD_APP_ID;
