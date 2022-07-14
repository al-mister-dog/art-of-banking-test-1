import {Button} from "@mui/material"

const CardButton = ({func}: {func: (v?: any) => void}) => {
  return (
    <Button sx={{width: "50px", justifyContent: "flex-start"}} onClick={func}/>
  )
};

export default CardButton