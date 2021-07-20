import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Networks, shorter, TOKENS_BY_NETWORK } from '../utils'
import ERC20ABI from '../abi/ERC20.abi.json'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEagerConnect } from '../hooks/useEagerConnect'
import { useInactiveListener } from '../hooks/useInactiveListener'
import { formatUnits } from '@ethersproject/units'
import useSWR, { SWRConfig } from 'swr'
import fetcher from 'swr-eth'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
  ],
})

export const Wallet = () => {
  const {
    chainId,
    account,
    library,
    activate,
    active,
    connector,
    deactivate
  } = useWeb3React<Web3Provider>()

  // [
  //   [ 0x00001, JSONABI ]
  // ]
  // const ABIs = useMemo(() => {
  //   return (TOKENS_BY_NETWORK[chainId] || []).map<[string, any]>(
  //     ({ address, abi }) => [address, abi]
  //   )
  // }, [chainId])

  // console.log({ABIs})
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    console.log('Wallet running')
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // mount only once or face issues :P
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

  const ABIs = useMemo(() => {
    return (TOKENS_BY_NETWORK[chainId] || []).map<[string, any]>(
      ({ address, abi }) => [address, abi]
    )
  }, [chainId])

  injectedConnector.on("connect", (info: { chainId: number }) => {
     alert("Onconnect call here API v1/setwallet( USDT=9, "+account+" )");
   });  

  const connectWallet = () => {
    activate(injectedConnector);
    // when the wallet is connected, this automatically calls the  API setwallet( USDT, {account} )  
  }

  const onDisconnect = () => {     
    injectedConnector.deactivate();
    deactivate();
  }

  const sym = TOKENS_BY_NETWORK[Networks.Kovan][0].symbol;
  const addr = TOKENS_BY_NETWORK[Networks.Kovan][0].address;
  const deci = TOKENS_BY_NETWORK[Networks.Kovan][0].decimals;

  const { data: balance, mutate } = useSWR([addr, 'balanceOf', account])

  const bal = (balance === undefined) ? ("??? " + sym) : (parseFloat(formatUnits(balance, deci)).toPrecision(6) + sym);
  
  return (
    <div>
      {/*  chain id not important
      <div>ChainId: {chainId}</div>
      */}
      <div>Account: {account}</div>      
      {active ? (
        <><SWRConfig value={{ fetcher: fetcher(library, new Map(ABIs)) }}>
        {bal}
        </SWRConfig><br/>
        <button type="button" onClick={onDisconnect}>          
            Disconnect
        </button></>
      ) : (
        <button type="button" onClick={connectWallet}>
          Connect
        </button>
      )}      
    </div>
  )
}
