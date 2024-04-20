import { createContext } from 'react';

// 컴포넌트로 사용할 것이기 때문에 앞글자가 대문자임
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updatedItemQuantity: () => {},
});
