import type { Callback, CommandCommon, InvokeArgs, InvokeOptions, PluginListenerCommon } from '@yasumu/common';

export class CommandsListener implements PluginListenerCommon {
  public constructor(
    public channelId: number,
    public event: string,
    public plugin: string,
  ) {}

  public async unregister(): Promise<void> {}
}

export class CommandsMock implements CommandCommon {
  public async addPluginListener<T = unknown>(
    plugin: string,
    event: string,
    cb: Callback<[T]>,
  ): Promise<PluginListenerCommon> {
    return new CommandsListener(0, event, plugin);
  }

  public async invoke<T = unknown>(command: string, args?: InvokeArgs, options?: InvokeOptions): Promise<T> {
    return {} as T;
  }
}
