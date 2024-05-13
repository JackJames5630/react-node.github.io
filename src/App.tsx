import './App.css';
import './styles/global.css';
import './styles/fonts.css';
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { useMemo, useCallback } from "react";
import Modal  from 'react-modal';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { getPhantomWallet, getSolletExtensionWallet, getSolletWallet, getSolflareWallet, getLedgerWallet, getSolongWallet, getMathWallet, getSafePalWallet, getSlopeWallet, getCoin98Wallet } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ToastProvider } from 'react-toast-notifications'
import { ThemeProvider } from "@material-ui/styles"
import { LightTheme, DarkTheme } from "./components/MuiTheme"
import DashboardPage from './pages/DashboardPage';
import CONFIG from './config'
import store from './store';
import {Provider, useSelector} from 'react-redux';
const { CLUSTER_API } = CONFIG;

require('@solana/wallet-adapter-react-ui/styles.css');

Modal.setAppElement('#root');

const AppWithProvider = () => {
  const themes = [DarkTheme, LightTheme];
  const themeMode = useSelector((state: any) => state.themeReducer.themeMode);
  const theme = themes[themeMode];
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSlopeWallet(), getSafePalWallet(),  getSolletExtensionWallet(), getSolletWallet()
      , getLedgerWallet(), getSolongWallet(), getMathWallet(),  getCoin98Wallet()
    ],
    []
  );
  return (
      <ConnectionProvider endpoint={CLUSTER_API}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <ToastProvider autoDismissTimeout={5000}>
              <ThemeProvider theme={theme} >
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<DashboardPage {...theme}/>} />
                  </Routes>
                </BrowserRouter>
              </ThemeProvider>
            </ToastProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  )
}
export default AppWithProvider;