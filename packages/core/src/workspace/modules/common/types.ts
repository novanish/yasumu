import type { InteractiveWebResponse } from '@/workspace/network/InteractiveWebResponse.js';
import type { YasumuRawGraphqlEntity } from '../graphql/types.js';
import type { YasumuRawRestEntity } from '../rest/types.js';
import type { YasumuSmtpEntity } from '../smtp/YasumuSmtpEntity.js';
import type { YasumuSocketIOEntity } from '../socketio/YasumuSocketIOEntity.js';
import type { YasumuSseEntity } from '../sse/YasumuSseEntity.js';
import type { YasumuWebSocketEntity } from '../websocket/YasumuWebSocketEntity.js';
import type { WorkspaceModuleType } from './constants.js';
import type { InteractiveWebRequest } from '@/workspace/network/InteractiveWebRequest.js';

export interface YasumuEntityDataMap {
  [WorkspaceModuleType.Rest]: YasumuRawRestEntity;
  [WorkspaceModuleType.GraphQL]: YasumuRawGraphqlEntity;
  [WorkspaceModuleType.SMTP]: YasumuSmtpEntity;
  [WorkspaceModuleType.SSE]: YasumuSseEntity;
  [WorkspaceModuleType.SocketIO]: YasumuSocketIOEntity;
  [WorkspaceModuleType.Websocket]: YasumuWebSocketEntity;
}

export type YasumuEntityScript = string;

// export interface YasumuEntityScript {
//   /**
//    * The script file name.
//    */
//   name: string;
//   /**
//    * The script content.
//    */
//   content: string;
// }

export interface CommonEntityMetadata {
  /**
   * The entity id
   */
  id: string;
  /**
   * The entity name
   */
  name: string;
  /**
   * The entity path
   */
  path: string;
}

export interface ExecutionOptions {
  preScript?: boolean;
  postScript?: boolean;
  testScript?: boolean;
  request?: InteractiveWebRequest;
}

export const LogLevel = {
  Log: 'log',
  Warning: 'warning',
  Error: 'error',
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export const ScriptType = {
  PreScript: 'pre-script',
  PostScript: 'post-script',
  TestScript: 'test-script',
} as const;

export type ScriptType = (typeof ScriptType)[keyof typeof ScriptType];

export interface ScriptOutput {
  log: string;
  level: LogLevel;
}

export interface ScriptResult {
  type: ScriptType;
  output: ScriptOutput[];
}

export const TestStatus = {
  Passed: 'passed',
  Failed: 'failed',
  Skipped: 'skipped',
} as const;

export type TestStatus = (typeof TestStatus)[keyof typeof TestStatus];

export interface TestSuite {
  id: string;
  name: string;
}

export interface TestEntry {
  suite: TestSuite | null;
  id: string;
  name: string;
  status: TestStatus;
  log: string;
  time: number;
}

export interface TestResult {
  tests: TestEntry[];
}

export interface ExecutionResult {
  preScript: ScriptResult;
  postScript: ScriptResult;
  test: TestResult;
  response: InteractiveWebResponse | null;
}
