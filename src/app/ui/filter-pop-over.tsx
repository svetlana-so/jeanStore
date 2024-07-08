"use client";

import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import { IoFilterOutline } from "react-icons/io5";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
import {jeansColors} from "../lib/definitions";

export default function PopOver() {

 
  return (
    <Popover placement="bottom" showArrow={true}
    backdrop="opaque">
      <PopoverTrigger>
        <Button color='warning'>Filter <IoFilterOutline /></Button>
      </PopoverTrigger>

      <PopoverContent >
      <div className="px-4 py-3 w-[330px]">
          <p className="text-small font-bold text-foreground" >
            Dimensions
          </p>
          <div className="mt-2 flex flex-col gap-4 w-full">
            <Input placeholder="Brand" size="sm" variant="bordered" />
            <Select 
            size='lg'
        placeholder="Select color" 
        className="max-w-xs" 
      >
        {jeansColors.map((color) => (
          <SelectItem  key={color.key}>
            {color.label}
          </SelectItem>
        ))}
      </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
