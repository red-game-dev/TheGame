import { createAction, props } from "@ngrx/store";
import { FetchError } from "@models/error";

export const fetchFailed = createAction('[Error] Fetch Failure', props<{ payload: FetchError[] }>());
