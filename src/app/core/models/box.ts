
export interface ItemVariant {
  id: string;
  name: string;
  value: number;
}

export interface OpenedBox {
  id: string;
  boxId: string;
  itemVariant: ItemVariant;
}

export interface Box {
  id: string;
  iconUrl: string;
  name: string;
  cost: number;
  boxOpenings?: OpenedBox[]
}
