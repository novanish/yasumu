import { Console } from './utilities/console';
import { Headers } from './utilities/headers';

export function prepareScript(code: string, ctx: string) {
  const fnName = `__YasumuScriptVm__${Date.now()}`;

  return `${Headers}
  var Yasumu = Object.preventExtensions({
    context: {
      data: ${ctx},
      __meta: {
        store: {},
        requestHeaders: null,
        console: []
      },
    },
    request: {
      get url() {
        return Yasumu.context.data.request.url;
      },
      get method() {
        return Yasumu.context.data.request.method;
      },
      get headers() {
        Yasumu.context.__meta.requestHeaders = new Headers(Yasumu.context.data.request.headers);
        return Yasumu.context.__meta.requestHeaders;
      },
    },
    response: {
      get url() {
        return Yasumu.context.data.response.url;
      },
      get method() {
        return Yasumu.context.data.response.method;
      },
      get headers() {
        return new Headers(Yasumu.context.data.response.headers);
      },
      get status() {
        return Yasumu.context.data.response.status;
      },
      get statusText() {
        return Yasumu.context.data.response.statusText;
      },
      get bodyText() {
        return Yasumu.context.data.response.bodyText;
      },
      get responseTime() {
        return Yasumu.context.data.response.responseTime;
      },
    },
    store: {
      get(key) {
        return Yasumu.context.__meta.store[key];
      },
      set(key, value) {
        Yasumu.context.__meta.store[key] = value;
      },
      remove(key) {
        delete Yasumu.context.__meta.store[key];
      },
      has(key) {
        return key in Yasumu.context.__meta.store;
      },
      count() {
        return Object.keys(Yasumu.context.__meta.store).length;
      },
      clear() {
        Yasumu.context.__meta.store = {};
      },
      entries() {
        return Object.entries(Yasumu.context.__meta.store);
      },
    },
  });

  ${Console}

  function ${fnName}() {
    ${code}
  }
  ${fnName}.toString = () => "function() { [native code] }";
  try {
    void ${fnName}();
  } catch(e) {
   console.log(typeof e.stack, e.stack);
    const err = e && e.stack ? e.stack : String(e);
    
    Yasumu.context.__meta.console.push({
      timestamp: Date.now(),
      type: 'error',
      args: [err],
    })
  }
  
  JSON.stringify(Yasumu.context.__meta)
  `;
}

export interface ConsoleStream {
  type: 'log' | 'warn' | 'error' | 'info';
  args: string[];
  timestamp: number;
}

export interface YasumuPostEvaluationData {
  store: Record<string, unknown>;
  requestHeaders: null;
  console: ConsoleStream[];
}

export function canEvaluateResult(data: YasumuPostEvaluationData | unknown): data is YasumuPostEvaluationData {
  return !!(data && typeof data === 'object');
}