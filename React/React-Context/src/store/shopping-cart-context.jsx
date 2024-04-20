import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

// 컴포넌트로 사용할 것이기 때문에 앞글자가 대문자임
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updatedItemQuantity: () => {},
});

// 첫번째 인자로 스냅샷이 보장된 state를 받음
function shoppingCartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // 마지막 스냅샷의 데이터를 잃지 않도록 추가해주는 것이 좋음
      items: updatedItems,
    };
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const { productId, amount } = action.payload;

    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

// 모든 App.jsx 로직을 Context API 설정을 해줌
// 어떠한 컴포넌트도 chilren에 넣어 전역 상태를 제공해주기 위해 설정
export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer, // 리듀서 함수
    {
      items: [], // 초기값 정의
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        // 객체 형식으로 묶고 shorthand property를 사용
        productId,
        amount,
      },
    });
  }

  // 렌더링 될 때 이 객체가 전역 설정이 됨
  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updatedItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
