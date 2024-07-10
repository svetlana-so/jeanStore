import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { Button } from "@/components/ui/button"
  import { IoFilterOutline } from "react-icons/io5";
  import { SelectField } from "./componentsForFilterBar/select";
  import { ToggleGroupFiled } from "./componentsForFilterBar/toggle-group-field";
  import { waist, jeansColors, measurementLength, measurementInseam, measurementThigh, measurementFrontCrotch, measurementHip, measurementBackCrotch } from "@/app/lib/jeansDefinitions";

 export const Filter = () => {
  return (
    <>
     <div>
<Drawer>
  <DrawerTrigger className="flex flex-row gap-4 items-center bg-sky-200 p-2 rounded-md">Filter <IoFilterOutline/></DrawerTrigger>
  
  <DrawerContent className="">
    <DrawerHeader>
      <DrawerTitle>Women Hardcoded</DrawerTitle>
      <div>
       <SelectField title={'brand'}/> 
     </div>
     <div className="flex flex-col gap-2">
     <p>Size: </p>
     <ToggleGroupFiled items={['M', 'S', 'L']}/>
     </div>
     <div className="flex flex-col gap-2">
     <p>Color: </p>
     <ToggleGroupFiled items={jeansColors}/>
     </div>
     <div className="flex flex-col gap-2">
        <p>Waist (in): </p>
        <ToggleGroupFiled items={waist} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Inseam (in): </p>
        <ToggleGroupFiled items={measurementInseam} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Thigh (in): </p>
        <ToggleGroupFiled items={measurementThigh} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Back Crotch (in): </p>
        <ToggleGroupFiled items={measurementBackCrotch} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Front Crotch (in): </p>
        <ToggleGroupFiled items={measurementFrontCrotch} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Hip (in): </p>
        <ToggleGroupFiled items={measurementHip} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Length (in): </p>
        <ToggleGroupFiled items={measurementLength} />
      </div>
    </DrawerHeader>
    <DrawerFooter>
      <Button >Apply</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
     </div>
     </>
  )
}
