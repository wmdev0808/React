export const TOGGLE_FAV = "TOGGLE_FAV";

export const toggleFav = (id: string) => {
  return { type: TOGGLE_FAV, productId: id };
};
