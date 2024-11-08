'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { EnvVarsTable } from './(components)/env-table';

export default function Environment() {
  const params = useSearchParams();
  const env = params.get('env');
  if (!env) return null;

  return (
    <main className="p-7 max-h-screen overflow-y-scroll">
      <div className="pb-4 border-b">
        <h2 className="text-foreground/95">{env}</h2>
        <h3 className="text-foreground/70 text-sm">{env} environment</h3>
      </div>
      <Label className="flex gap-3 items-center mt-4">
        <Checkbox className="size-4" />
        <span className="text-foreground/90">Use this environment in this workspace.</span>
      </Label>

      <div className="mt-12">
        <h3 className="text-foreground/90 text-sm">Variable</h3>
        <p className="text-foreground/70 text-sm mt-1">Variable will be publicly exported in the workspace.</p>
        <div className="my-7">
          <EnvVarsTable />
        </div>
      </div>

      <div className="pl-7 mt-12">
        <h3 className="text-foreground/90 text-sm">Secrets</h3>
        <p className="text-foreground/70 text-sm mt-1">Secret will not be exported in the workspace.</p>
        <div className="my-7">
          <EnvVarsTable />
        </div>
      </div>
    </main>
  );
}
