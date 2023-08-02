import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

//wallet import
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai, celoAlfajores} from "wagmi/chains";
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

//style import
import "@rainbow-me/rainbowkit/styles.css";
// import "./styles/site.css";

//wagmi
const { chains, publicClient } = configureChains(
  [polygonMumbai, celoAlfajores],
  [
    jsonRpcProvider({
      rpc: (polygonMumbai, celoAlfajores) => ({
        http: import.meta.env.VITE_CHAINSTACK_NODE_RPC_ENDPOINT,
      }),
    }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: "Spacetar | A Community Empowering Mental Well-Being",
  projectId: import.meta.env.VITE_SPACESTAR_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  publicClient,
  autoConnect: true,
  connectors,
  // provider,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode theme={midnightTheme()} chains={chains}></RainbowKitProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>,
);
