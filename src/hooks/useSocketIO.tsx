import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import getConfig from 'next/config';
import { useQuery } from '@apollo/client';
import { getUserQuery } from '@operations/user';

const { publicRuntimeConfig } = getConfig();

const useSocketIO = (roomId: string): Socket | undefined => {
  const [socket, setSocket] = useState<Socket>();

  const { data, loading } = useQuery(getUserQuery, {
    variables: { addAuth: true }
  });

  useEffect((): (() => void) => {
    // Initialize the Socket.io client
    if ((!socket || !socket?.connected) && data) {
      // connect to your server.
      setSocket(
        io(`${publicRuntimeConfig.docuHubApiURL}`, {
          path: '/websockets',
          auth: { token: data.user.token },
          extraHeaders: { Authorization: data.user.token },
          query: { documentId: roomId }
        })
      );
    }

    // Clean up the Socket.io client when the component unmounts.
    return () => socket?.disconnect();
  }, [data, loading]);

  return socket;
};

export default useSocketIO;
