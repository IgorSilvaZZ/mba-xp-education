import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SelectInputProps {
  label: string;
  selectValue: string;
  children: JSX.Element[];
  onSelectChange?: (newValue: string) => void;
}

export const SelectInput = ({
  children: items,
  label,
  selectValue = "",
  onSelectChange,
}: SelectInputProps) => {
  function handleSelectInputChange({ target }: SelectChangeEvent) {
    if (onSelectChange) {
      onSelectChange(target.value);
    }
  }

  return (
    <>
      <FormControl sx={{ width: "40%" }}>
        <InputLabel shrink sx={{ color: "white" }}>
          {label}
        </InputLabel>
        <Select
          size='small'
          label={label}
          value={selectValue}
          onChange={handleSelectInputChange}
          sx={{
            border: "1px solid gray",
            outline: "none",
            borderRadius: "15px",
          }}
        >
          {items}
        </Select>
      </FormControl>
    </>
  );
};
