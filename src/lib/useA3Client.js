import {
  ref,
} from 'vue';

import {
  ConnectionState,
  isClosed,
  isOpen,
} from '@seiberspace/any-conn-shared';

import createA3Client from '@seiberspace/any-conn-client';

const clients = new Map();

/**
 * Instead of just a state I keep a record around
 * containing also UI-infos and some flags.
 */
const CONNECTION_STATE_INFOS = {
  [ConnectionState.Closed]: {
    label: 'connection.state.disconnected',
    icon: 'link_off',
    color: 'grey-7',
    busy: false,
    connected: false,
  },
  [ConnectionState.Closing]: {
    label: 'connection.state.disconnecting',
    icon: 'link',
    busy: true,
    connected: true,
  },
  [ConnectionState.Opening]: {
    label: 'connection.state.connecting',
    icon: 'link_off',
    busy: true,
    connected: false,
  },
  [ConnectionState.Open]: {
    label: 'connection.state.connected',
    icon: 'link',
    color: 'positive',
    busy: false,
    connected: true,
  },
  [ConnectionState.Error]: {
    label: 'connection.state.error',
    icon: 'error',
    color: 'negative',
    busy: false,
    connected: false,
  },
};

//------------------------------------------------------------------------------
function updateStatus(client, a3client) {
  client.status.value = (isClosed(a3client.state) && a3client.error)
    ? {
      ...CONNECTION_STATE_INFOS[ConnectionState.Error],
      label: a3client.error.message,
    }
    : CONNECTION_STATE_INFOS[a3client.state];
}

//------------------------------------------------------------------------------
function useA3Client(clientId = 'default') {
  let client = clients.get(clientId);
  if (client) {
    return client;
  }

  client = {
    state: ref(ConnectionState.Closed),
    error: ref(null),
    status: ref(null),
  };

  const a3client = createA3Client();

  a3client.subscribe('state', ({ newState }) => {
    client.state.value = newState;
    updateStatus(client, a3client);
  });

  a3client.subscribe('close', (error) => {
    client.error.value = error;
    updateStatus(client, a3client);
  });

  client.toggleConnect = () => (isOpen(a3client.state)
    ? a3client.close()
    : a3client.open());

  client.setup = a3client.setup;
  client.close = a3client.close;
  client.open = a3client.open;
  client.send = a3client.send;
  client.api = a3client.api;
  client.subscribeEvent = a3client.subscribeEvent;

  updateStatus(client, a3client);
  clients.set(clientId, client);

  return client;
}

export default useA3Client;
