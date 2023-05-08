import { useEffect } from 'react';
import useWebSocket, { SendMessage } from 'react-use-websocket';

const URL = 'ws://localhost:8088/socket' as const;

const useQueryWebsockets = (
  queryKey: string,
  onMessage: (queryKey: string, data: unknown, sendMessage: SendMessage) => void
) => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(URL, { share: true });

  useEffect(() => {
    try {
      if (lastMessage) {
        console.log('message: ', lastMessage);
        const data = JSON.parse(lastMessage.data);
        onMessage?.(queryKey, data, sendMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }, [lastMessage]);

  return { lastMessage, sendMessage, readyState };
};

export default useQueryWebsockets;
