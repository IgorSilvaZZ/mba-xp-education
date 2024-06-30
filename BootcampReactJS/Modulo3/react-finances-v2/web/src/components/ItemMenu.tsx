import { Box } from "@mui/material";

interface ItemMenuProps {
  children: string;
  icon: JSX.Element;
  onClick?: () => void | null;
}

export const ItemMenu = ({
  children: description = "Texto do Item",
  icon,
  onClick,
}: ItemMenuProps) => {
  function handleClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#121212",
          borderRadius: "8px",
          width: "80%",
          p: "15px 12px",
          color: "white",
          gap: "10px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {icon}
        <span>{description}</span>
      </Box>
    </>
  );
};
