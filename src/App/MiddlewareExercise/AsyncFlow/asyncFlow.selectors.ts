import { RootState as IState } from "src/store";

export const swPeopleSelector = (state: IState) => state.asyncFlow.swPeople
export const isLoadingSelector = (state: IState) => state.asyncFlow.isLoading