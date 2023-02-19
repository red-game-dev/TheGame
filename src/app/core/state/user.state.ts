import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "@models/user";

export interface UserState extends EntityState<User> {
  loading: boolean;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (entity: User) => entity.id,
});
