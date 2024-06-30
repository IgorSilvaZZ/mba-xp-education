import { TableCell } from "@mui/material";

export const CustomCellTable = ({ children }: { children: string }) => {
  return <TableCell sx={{ color: "#fff" }}>{children}</TableCell>;
};
