import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Box } from "@models/box";

export interface BoxState extends EntityState<Box> {
  loading: boolean;
  isBoxOpening: boolean;
}

export const boxAdapter: EntityAdapter<Box> = createEntityAdapter<Box>({
  selectId: (entity: Box) => entity.id,
});
