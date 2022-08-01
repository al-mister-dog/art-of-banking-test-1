import { useAppDispatch } from "../../app/hooks";
import {createNewCustomer} from "../../features/lectures/lecturesSlice"
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const CreateForm = () => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState("Customer X");
  const [cash, setCash] = useState(0);
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangeCash = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value)
    setCash(amount);
  };
  const onClickCreate = () => {
    dispatch(createNewCustomer({name, cash}))
  }
  return (
    <>
      <TextField
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleChangeName}
      />
      <TextField
        id="outlined-name"
        label="Cash"
        value={cash}
        onChange={handleChangeCash}
      />
      <Button onClick={onClickCreate}>Create</Button>
    </>
  );
};
export default CreateForm;
