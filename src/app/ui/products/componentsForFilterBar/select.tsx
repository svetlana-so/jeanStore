import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
  } from "@/components/ui/select"
  

type SelectFieldProps = {
    title: string
}

export const SelectField = ({title}: SelectFieldProps) => {
  return (
    <Select>
    <SelectTrigger className="w-[280px]">
    <SelectValue placeholder={`Select ${title}`} />
    </SelectTrigger>
    <SelectContent>
    <SelectGroup>
        <SelectLabel>{title}</SelectLabel>
        <SelectItem value="apple">Zara</SelectItem>
        <SelectItem value="banana">Bershka</SelectItem>
        
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}
