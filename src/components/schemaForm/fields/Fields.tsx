import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FieldProps } from "../interface";
import "../../../index.css";

const TextField: React.FC<FieldProps> = ({ field, formItem, loading }) => (
  <Input
    type={formItem.type}
    autoComplete={formItem.autoComplete}
    disabled={formItem.disabled || loading}
    placeholder={formItem.placeholder}
    {...field}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      if (e) {
        field.onChange(e.target.value);
      }
    }}
  />
);

const SelectField: React.FC<FieldProps> = ({ field, formItem, loading }) => (
  <Select
    disabled={formItem.disabled || loading}
    defaultValue={field.value}
    onValueChange={field.onChange}
  >
    <SelectTrigger>
      <SelectValue placeholder={formItem.placeholder || "Select option"} />
    </SelectTrigger>
    <SelectContent position="popper">
      {formItem.options?.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const TextAreaField: React.FC<FieldProps> = ({ field, formItem, loading }) => (
  <Textarea
    disabled={formItem.disabled || loading}
    placeholder={formItem.placeholder}
    {...field}
  />
);

const RadioGroupField: React.FC<FieldProps> = ({
  field,
  formItem,
  loading,
}) => (
  <RadioGroup
    defaultValue={field.value}
    onValueChange={field.onChange}
    disabled={formItem.disabled || loading}
  >
    {formItem.options?.map((option) => (
      <div key={option.value} className="flex items-center space-x-2">
        <RadioGroupItem
          value={option.value}
          id={`${formItem.key}-${option.value}`}
        />
        <Label htmlFor={`${formItem.key}-${option.value}`}>
          {option.label}
        </Label>
      </div>
    ))}
  </RadioGroup>
);

const DateField: React.FC<{
  field: ControllerRenderProps<FieldValues, string>;
}> = ({ field }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className="w-full justify-start text-left font-normal"
      >
        <CalendarIcon className="mr-2" />
        {field.value ? format(new Date(field.value), "PPP") : "Select a date"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={field.value ? new Date(field.value) : undefined}
        onSelect={(date) => field.onChange(date ? date.getTime() : null)}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

export { TextField, SelectField, TextAreaField, RadioGroupField, DateField };
