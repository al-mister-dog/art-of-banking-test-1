import { Box, Typography } from "@mui/material";
import bankImg2 from "./assets/medici2.jpeg";

const image = {
  src: bankImg2,
  alt: "Map of Florence from the Nuremberg Chronicle, 1493, via Barry Lawrence Ruderman Map Collection, Stanford University",
};

export default function Home() {
  return (
    <>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          borderRadius: "15px",
          background: "#F2EECB",
          marginTop: "150px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: "40px",
          }}
        >
          <Typography variant="h6" align="center">
            <strong>Learn the Art of Banking</strong> - from the Italian masters
            to the New York Money Market...
          </Typography>

          <img
            style={{
              height: "95%",
              width: "95%",
              marginTop: "20px",
              marginBottom: "40px",
              borderRadius: "10px",
            }}
            src={image.src}
            alt={image.alt}
          />
          <Typography>
            Understanding banking and finance is a key requirement of making
            informed decisions, whether you are a thinking about earning extra
            money in trading and investment, or whether you want to learn more
            about economics in order to make informed decisions as a voter or 
            a content provider.
          </Typography>
          <Typography>
            Unfortunately the world of banking is obscured in jargon as well as 
            well as the fact that many of the opinions we receive about the subject
            come from people as misinformed as we are. This site aims to shed light
            on the world of banking and present it in a concrete way, assuming next
            to zero understanding, bringing the student from the very basics of making
            a deposit at the bank, all the way up to a working knowledge of such things as 
            Credit Default Swaps, Repos, Liquidity and Global Finance.
          </Typography>
          <Typography>
            To do this, the lectures contain small games in which the user can trade 
            between banks and other institutions like pieces on a board. These games
            model banking systems from around the world and different time periods. 
            This is an unfunded project, so please enjoy what is on here so far and 
            new lectures will be posted as and when is possible.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
