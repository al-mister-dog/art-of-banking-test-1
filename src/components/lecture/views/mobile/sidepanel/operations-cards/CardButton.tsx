import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import {colors} from "../../../../../../config/colorPalette"
// const CardButton = ({func}: {func: (v?: any) => void}) => {
//   return (
//     <Button sx={{width: "50px", justifyContent: "flex-start", color: "red"}} onClick={func}/>
//   )
// };

// export default CardButton

const CardButton = styled(Button)({
  // boxShadow: 'none',
  // textTransform: 'none',
  // fontSize: 16,
  // padding: '6px 12px',
  // border: '1px solid',
  // lineHeight: 1.5,
  // backgroundColor: '#0063cc',

  // borderColor: '#0063cc',
  // fontFamily: [
  //   '-apple-system',
  //   'BlinkMacSystemFont',
  //   '"Segoe UI"',
  //   'Roboto',
  //   '"Helvetica Neue"',
  //   'Arial',
  //   'sans-serif',
  //   '"Apple Color Emoji"',
  //   '"Segoe UI Emoji"',
  //   '"Segoe UI Symbol"',
  // ].join(','),
  minWidth: "100px", justifyContent: "flex-start",
  backgroundColor: colors.paper,
  color: colors.darkMain,
  '&:hover': {
    backgroundColor: colors.balanceSheetsColor,
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: colors.balanceSheetsColor,
    borderColor: colors.darkMain,
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
  '&:disabled': {
    backgroundColor: "rgba(242, 238, 203, .5)"
  },
});

export default CardButton