import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { SocketIOProvider } from 'y-socket.io';
import * as Y from 'yjs';
import { Document, User } from '@schema/types';

const { publicRuntimeConfig } = getConfig();

const useYSocketIOProvider = (
  userData: User,
  documentData: Document
): [Y.Doc, SocketIOProvider] => {
  const [yDoc, setYDoc] = useState<Y.Doc>(() => {
    const ydoc = new Y.Doc({ meta: { user: userData } });
    const yMap = ydoc.getMap('data');
    yMap.set('data', documentData.documentJSON);
    return ydoc;
  });

  const [status, setStatus] = useState<string>('disconnected');
  const [clients, setClients] = useState<string[]>([]);

  const [provider, setProvider] = useState<SocketIOProvider>(() => {
    const socketIOProvider = new SocketIOProvider(
      `${publicRuntimeConfig.docuHubApiURL}`,
      documentData.id,
      yDoc,
      {
        auth: { token: userData.token }
      }
    );

    return socketIOProvider;
  });

  useEffect(() => {
    console.log('setting providers');
    provider.awareness.on('change', () =>
      setClients(
        Array.from(provider.awareness.getStates().keys()).map((key) => `${key}`)
      )
    );
    provider.awareness.setLocalState({
      id: userData.id,
      name: userData.firstname
    });
    provider.on('sync', (isSync: boolean) =>
      console.log('websocket sync', isSync)
    );
    provider.on('status', ({ status: _status }: { status: string }) => {
      if (!!_status) setStatus(_status);
    });

    // Clean up the Y socket.io provider client when the component unmounts.
    return () => provider.disconnect();
  }, [provider]);

  return [yDoc, provider];
};

export default useYSocketIOProvider;
