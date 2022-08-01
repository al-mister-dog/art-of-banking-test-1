import { lookup } from "../../domain/lookupTables";
import { fundamentalsState } from "../../config/state";
import { createBankingSystem } from "../../helpers/createParties";

const defaultSetup = fundamentalsState.defaultSetup;
createBankingSystem(defaultSetup);
const setupState = JSON.parse(JSON.stringify(lookup));
export { setupState, defaultSetup };
