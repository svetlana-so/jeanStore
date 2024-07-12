import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';

type SelectFieldProps = {
  brands: string[];
};

export const SelectField = ({ brands }: SelectFieldProps) => {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={`Select brand`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {brands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
