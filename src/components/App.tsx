import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Wallet } from './Wallet'
import { Button } from '@material-ui/core';
import { TradePage } from './TradePage';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
       <h3>Trade Lists</h3>
      <Wallet />
      <TradePage />
    </Web3ReactProvider>
  )
}
