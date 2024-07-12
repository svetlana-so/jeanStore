import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import React from 'react';

type ToggleGroupFiledProps = {
  items: (string | number)[];
};

export const ToggleGroupFiled = ({ items }: ToggleGroupFiledProps) => {
  return (
    <ToggleGroup type="multiple" variant="outline" className="flex flex-wrap">
      {items.map((item) => (
        <ToggleGroupItem key={item} value={String(item)}>
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
