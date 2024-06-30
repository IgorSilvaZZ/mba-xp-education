import { Paper, TableContainer } from "@mui/material";

export const CustomTableContainer = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ height: "300px", width: "100%", backgroundColor: "#0c0c0e" }}
      >
        {children}
      </TableContainer>
    </>
  );
};
