import { useCreateAgency } from "@dataAccess";
import { Box, Button, Grid, TextInput, Typography } from "@elements";
import { IAgency } from "@types";
import { extractString } from "@utils";
import React from "react";

export const CadastroImagem = () => {

  const { mutateAsync, isLoading } = useCreateAgency()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const agency: IAgency = {
      name: extractString(data.get('name') as string),
      cnpj: extractString(data.get('name') as string),
      address: extractString(data.get('name') as string),
      manager: extractString(data.get('name') as string),
      managerPhone: extractString(data.get('name') as string),
      managerEmail: extractString(data.get('name') as string),
    }

    mutateAsync(agency).then(res => {
      console.log(res)
      alert("sucesso")
    }).catch(error => alert("erro: " + error))
  }

  return <Grid container sx={{ height: '100vh' }}>
    <Grid item xs={12} sm={8} md={5}
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Cadastro de loja
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextInput
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Grid>
  </Grid>
}