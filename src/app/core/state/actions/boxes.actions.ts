import { createAction, props } from '@ngrx/store';
import { Box, OpenedBox } from '@models/box';

export interface FetchBoxesPayload {
  free?: boolean;
  purchasable?: boolean;
  openable?: boolean;
}

export interface OpenBoxPayload {
  boxId: string;
  amount: number;
}

export const fetchBoxes = createAction('[Boxes] Get Boxes', props<{ payload?: FetchBoxesPayload }>());

export const fetchBoxesSuccess = createAction('[Boxes] Get Boxes Success', props<{ payload: Box[] }>());

export const openBoxSuccess = createAction('[Boxes] Open Box Success', props<{ payload: OpenedBox[] }>());

export const openBox = createAction('[Boxes] Open Box', props<{ payload: OpenBoxPayload }>());
