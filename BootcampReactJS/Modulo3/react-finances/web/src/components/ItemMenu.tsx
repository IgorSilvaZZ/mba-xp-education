import { Box } from "@mui/material";

interface ItemMenuProps {
  children: string;
  icon: JSX.Element;
}

export const ItemMenu = ({
  children: description = "Texto do Item",
  icon,
}: ItemMenuProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#242529",
          borderRadius: "8px",
          width: "80%",
          p: "15px 12px",
          color: "white",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        {icon}
        <span>{description}</span>
      </Box>
    </>
  );
};
