'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 钱包状态类型定义
interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  isConnecting: boolean;
  error: string | null;
}

// 动作类型
type WalletAction =
  | { type: 'CONNECT_START' }
  | { type: 'CONNECT_SUCCESS'; payload: { address: string; balance: number } }
  | { type: 'CONNECT_ERROR'; payload: string }
  | { type: 'DISCONNECT' }
  | { type: 'UPDATE_BALANCE'; payload: number };

// 初始状态
const initialState: WalletState = {
  isConnected: false,
  address: null,
  balance: 0,
  isConnecting: false,
  error: null,
};

// Reducer
const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'CONNECT_START':
      return {
        ...state,
        isConnecting: true,
        error: null,
      };
    case 'CONNECT_SUCCESS':
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        address: action.payload.address,
        balance: action.payload.balance,
        error: null,
      };
    case 'CONNECT_ERROR':
      return {
        ...state,
        isConnecting: false,
        error: action.payload,
      };
    case 'DISCONNECT':
      return {
        ...initialState,
      };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
};

// Context类型
interface WalletContextType {
  state: WalletState;
  connectWallet: () => Promise<void>;
  connectWithGoogle: () => Promise<void>;
  disconnect: () => void;
}

// 创建Context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider组件
export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const connectWallet = async () => {
    dispatch({ type: 'CONNECT_START' });

    try {
      // 模拟钱包连接逻辑
      // 实际项目中这里会调用真实的钱包API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟连接成功
      const mockAddress = '9aS8...x345';
      const mockBalance = 11.530;

      dispatch({
        type: 'CONNECT_SUCCESS',
        payload: { address: mockAddress, balance: mockBalance }
      });
    } catch (error) {
      dispatch({
        type: 'CONNECT_ERROR',
        payload: '钱包连接失败，请重试'
      });
    }
  };

  const connectWithGoogle = async () => {
    dispatch({ type: 'CONNECT_START' });

    try {
      // 模拟Google登录逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟连接成功
      const mockAddress = 'google_user_123';
      const mockBalance = 0;

      dispatch({
        type: 'CONNECT_SUCCESS',
        payload: { address: mockAddress, balance: mockBalance }
      });
    } catch (error) {
      dispatch({
        type: 'CONNECT_ERROR',
        payload: 'Google登录失败，请重试'
      });
    }
  };

  const disconnect = () => {
    dispatch({ type: 'DISCONNECT' });
  };

  return (
    <WalletContext.Provider
      value={{
        state,
        connectWallet,
        connectWithGoogle,
        disconnect
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Hook
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
