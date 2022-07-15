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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
