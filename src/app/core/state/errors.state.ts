import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { FetchError } from "../models/error";

export type FetchErrorsState = EntityState<FetchError>

export const fetchFailedAdapter: EntityAdapter<FetchError> = createEntityAdapter<FetchError>({
  selectId: (error: FetchError) => error.name
});
