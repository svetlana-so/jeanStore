'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { IoFilterOutline } from 'react-icons/io5';
import { SelectField } from './componentsForFilterBar/select';
import { ToggleGroupFiled } from './componentsForFilterBar/toggle-group-field';

type FilterProps = {
  sizes: string[];
  colors: string[];
  brands: string[];
  sizeWaist: string[];
  sizeLength: string[];
  materials: string[];
  stretches: string[];
  measurementHip: string[];
  measurementFrontCrotch: string[];
  measurementBackCrotch: string[];
  measurementThigh: string[];
  measurementInseam: string[];
};

export const Filter = ({
  sizes,
  colors,
  brands,
  sizeWaist,
  sizeLength,
  materials,
  stretches,
  measurementHip,
  measurementFrontCrotch,
  measurementBackCrotch,
  measurementThigh,
  measurementInseam,
}: FilterProps) => {
  return (
    <>
      <div>
        <Drawer>
          <DrawerTrigger className="flex flex-row items-center gap-4 rounded-md bg-sky-200 p-2">
            Filter <IoFilterOutline />
          </DrawerTrigger>

          <DrawerContent className="">
            <DrawerHeader>
              <DrawerTitle>Women Hardcoded</DrawerTitle>
            </DrawerHeader>

            <ScrollArea className="m-2 overflow-y-auto">
              <div>
                <SelectField brands={brands} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Size: </p>
                <ToggleGroupFiled items={sizes} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Material: </p>
                <ToggleGroupFiled items={materials} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Color: </p>
                <ToggleGroupFiled items={colors} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Stretch: </p>
                <ToggleGroupFiled items={stretches} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Waist (in): </p>
                <ToggleGroupFiled items={sizeWaist} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Length (in): </p>
                <ToggleGroupFiled items={sizeLength} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Hip (in): </p>
                <ToggleGroupFiled items={measurementHip} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Front Crotch (in): </p>
                <ToggleGroupFiled items={measurementFrontCrotch} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Back Crotch (in): </p>
                <ToggleGroupFiled items={measurementBackCrotch} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Thigh (in): </p>
                <ToggleGroupFiled items={measurementThigh} />
              </div>
              <div className="my-2 flex flex-col gap-4">
                <p>Inseam (in): </p>
                <ToggleGroupFiled items={measurementInseam} />
              </div>
            </ScrollArea>

            <DrawerFooter>
              <Button>Apply</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};
