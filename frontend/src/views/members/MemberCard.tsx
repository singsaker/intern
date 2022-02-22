// Apollo
import { useLazyQuery } from "@apollo/client";
import { GET_MEMBER } from "@graphql/members/queries";
// Material-UI
import { Box, Chip, Grid, IconButton, Stack, styled, Typography } from "@mui/material";
import { X } from "phosphor-react";
import React, { useEffect } from "react";

const ProfileImgStyle = styled("img")(({ theme }) => ({
  borderRadius: "100%",
  height: 200,
  margin: "0 auto",
  marginBottom: theme.spacing(2),
}));

const MemberCard = (props: any) => {
  const [getMember, { data }] = useLazyQuery(GET_MEMBER);

  useEffect(() => {
    getMember({ variables: { id: props.beboer_id } });
  }, [props.beboer_id]);

  if (data?.member) {
    return (
      <>
        <Box sx={{ p: 4, maxWidth: 1 }}>
          <Box sx={{ width: 1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => props.toggleBeboerModal()} >
              <X />
            </IconButton>
          </Box>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <ProfileImgStyle src="/profile-placeholder.png" />
            <Typography variant="h4">
              {data.member.firstName} {data.member.lastName}
            </Typography>
            <Typography gutterBottom color="secondary" variant="overline">
              Vervtekst
            </Typography>
          </Box>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Chip label={data.member.phone}></Chip>
            </Grid>
            <Grid item>
              <Chip label={data.member.user?.email}></Chip>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography>
              Studerer {"beboer.studie.navn"} ved {"beboer.skole.navn"}. Går på {"beboer.klassetrinn"}. klassetrinn.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: 1, py: 3, px: 4, bgcolor: "grey.100", textAlign: "center" }}>
          <Stack spacing={3}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="overline">Bor på rom</Typography>
              <Typography variant="h4">273</Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="overline">Dager på huset</Typography>
              <Typography variant="h4">
                1200
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="overline">Bursdag</Typography>
              <Typography variant="h4">{data.member.birthDate}</Typography>
            </Stack>
          </Stack>
        </Box>
      </>
    );
  } else {
    return <></>
  }
};

export default MemberCard;