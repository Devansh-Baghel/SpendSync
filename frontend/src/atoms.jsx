import { atom } from "jotai";

const loggedInAtom = atom(localStorage.getItem("userStatus") === "loggedIn");
const userDataAtom = atom(JSON.parse(localStorage.getItem("userData")));
const showGoalsAtom = atom(localStorage.getItem("showGoals") === "true");
const showTransactionsAtom = atom(
  localStorage.getItem("showTransactions") === "true",
);

const selectedGoalAtom = useState({});
