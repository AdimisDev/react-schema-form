import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
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
import { IFieldSchema } from "./SchemaForm.interface";

const renderField = (
  formItem: IFieldSchema,
  field: ControllerRenderProps<FieldValues, string>,
  loading?: boolean
) => {
  console.log("Render Field FormItem: ", formItem);
  console.log("Render Field Field: ", field);

  switch (formItem.type) {
    case "email":
    case "password":
    case "string":
      return (
        <FormItem>
          {formItem.title && <FormLabel>{formItem.title}</FormLabel>}
          <FormControl>
            <Input
              type={formItem.type}
              disabled={formItem.disabled || loading}
              placeholder={formItem.placeholder}
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
        </FormItem>
      );
    case "select":
      return (
        <FormItem>
          {formItem.title && <FormLabel>{formItem.title}</FormLabel>}
          <FormControl>
            <Select
              disabled={formItem.disabled || loading}
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={formItem.placeholder || "Select option"}
                />
              </SelectTrigger>
              <SelectContent position="popper">
                {formItem.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      );
    case "textarea":
      return (
        <FormItem>
          {formItem.title && <FormLabel>{formItem.title}</FormLabel>}
          <FormControl>
            <Textarea
              disabled={formItem.disabled || loading}
              placeholder={formItem.placeholder}
              {...field}
            />
          </FormControl>
        </FormItem>
      );
    case "radio group":
      return (
        <FormItem>
          {formItem.title && <FormLabel>{formItem.title}</FormLabel>}
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
        </FormItem>
      );
    case "date":
      return (
        <FormItem>
          <FormLabel>{formItem.title}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2" />
                  {field.value
                    ? format(new Date(field.value), "PPP")
                    : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) =>
                    field.onChange(date ? date.getTime() : null)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      );
    default:
      return <div>Unsupported field type</div>;
  }
};

export default renderField;
