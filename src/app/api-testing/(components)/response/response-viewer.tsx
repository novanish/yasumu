'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@/components/ui/tabs';
import PrettyResponseViewer from './pretty-response-viewer';
import { ResponseHeaders } from './response-headers';
import { cn } from '@/lib/utils';
import { ResponseCookies } from './response-cookies';
import { ResponseStats } from './stats/response-stats';
import { useLayoutStore } from '@/stores/application/layout.store';
import { useResponse } from '@/stores/api-testing/response.store';

export default function ResponseViewer() {
  const { orientation } = useLayoutStore();
  const { headers, cookies, body } = useResponse();

  return (
    <div className={cn(orientation === 'horizontal' ? 'px-2' : 'p-2')}>
      <Tabs defaultValue="pretty" className="rounded-b-none">
        <div className="flex items-center justify-between">
          <TabsList className="rounded-b-none border-x border-t">
            <TabsTrigger value="pretty">Pretty</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
            <TabsTrigger value="headers">
              Headers{' '}
              <span className="text-green-500 text-sm ml-2">
                ({headers.length})
              </span>
            </TabsTrigger>
            <TabsTrigger value="cookies">
              Cookies{' '}
              <span className="text-green-500 text-sm ml-2">
                ({cookies.length})
              </span>
            </TabsTrigger>
          </TabsList>
          <ResponseStats />
        </div>
        <div
          className={cn(
            'border rounded-b-sm p-2 overflow-y-auto',
            orientation === 'vertical' ? 'max-h-[400px]' : 'max-h-[90vh]'
          )}
        >
          <TabsContent value="pretty">
            <PrettyResponseViewer content={body} />
          </TabsContent>
          <TabsContent value="raw">
            <pre
              className={cn('word-break-break-all whitespace-pre-wrap text-sm')}
            >
              {body}
            </pre>
          </TabsContent>
          <TabsContent value="headers">
            <ResponseHeaders headers={headers} />
          </TabsContent>

          <TabsContent value="cookies">
            <ResponseCookies cookies={cookies} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
