import { Box, Typography } from "@mui/material";
import { IBank } from "../../../../../features/lectures/fundamentalsSlice.spec";
import { deCamelize } from "../../../helpers/parsers";

const Records = ({ selected }: { selected: IBank }) => {
  return (
    <Box width={270}>
      {selected.records.map((record: any, index: number) => {
        const { accountId, accountType, id, credit, transactionAmount } =
          record;
        const payee = accountId.split("-")[1];
        const payer = accountId.split("-")[0];
        const string = `${deCamelize(payer)} ${
          credit ? `credited` : `debited`
        } $${transactionAmount} into ${deCamelize(payee)}'s account`;
        return (
          <Box>
            <Typography key={index}>{string}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Records;
