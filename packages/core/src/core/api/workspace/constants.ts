export const YasumuWorkspaceFiles = {
  Metadata: 'yasumu.json',
  StorePath: 'yasumu.bin',
  Http: 'http',
  GraphQL: 'graphql',
  Smtp: 'smtp',
  WebSocket: 'websocket',
  SocketIO: 'socketio',
  Grpc: 'grpc',
} as const;

export type YasumuWorkspaceFiles =
  (typeof YasumuWorkspaceFiles)[keyof typeof YasumuWorkspaceFiles];

export const YasumuStoreKeys = {
  YasumuWorkspaces: 'yasumu:workspaces',
} as const;

export type YasumuStoreKeys =
  (typeof YasumuStoreKeys)[keyof typeof YasumuStoreKeys];