import { Box, Typography } from "@mui/material";

import financesImage from "../assets/finances-image.png";

export const NotFoundExpenses = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          flex: "1",
          mt: "12px",
        }}
      >
        <Typography variant='h6'>
          Não ha desepesas para o mês selecionado!
        </Typography>
        <img src={financesImage} width='30%' />
      </Box>
    </>
  );
};
