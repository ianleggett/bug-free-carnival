import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import useSWR from "swr";
import React, {useEffect} from "react";
import {Contract} from "@ethersproject/contracts";
import ERC20ABI from "../abi/ERC20.abi.json";
import {formatUnits} from "@ethersproject/units";

export const Depositor = ({amt,symbol, address, decimals}) => {
    const {account, library} = useWeb3React<Web3Provider>()
    const {data: balance, mutate} = useSWR([address, 'balanceOf', account])

    // this comes from swagger API call getnetworkconfig.json
    const ESCROW = "0x618Bb55A032A4334AfBfdd07A297fe2B677B2052";
    
    const contract = new Contract(address, ERC20ABI, library.getSigner() ) 
  
    const depositusdt = () =>{
      contract.allowance(account,ESCROW).then((val)=>{
            if (val!=0){
              alert("Allowance was non zero ("+val+"), it has been reset, try again!!!");
              contract.approve(ESCROW, 0);
            }else{
              contract.approve(ESCROW, amt).then(()=>{
                // the escrow contract calls the transfer once deposit() is called
                alert("call here API v1/deposit( ctrid )");
              })
            }
          })
    }

    if (!balance) {
      return <div>depositor-notvalid sym:{symbol} addr:{address}</div>
    }
    return (
        <button onClick={depositusdt}>Deposit {amt/(10**decimals)} {symbol}</button>
    )
  }


//const string ESCROW = "0x618Bb55A032A4334AfBfdd07A297fe2B677B2052";

//<button onClick={this.handleClick()}>Deposit</button>
// function depositme(double amt){
//   console.log('deposit USDT Addr:'+address); 
//   console.log('deposit account:'+account); 
//   const contract = new Contract(address, ERC20ABI, library.getSigner()) 
//   alert("Hello");

//   contract.allowance(account,ESCROW).then((val)=>{
//     if (val!=0){
//       alert("Allowance was non zero ("+val+"), it has been reset, try again!!!");
//       contract.approve(ESCROW, 0);
//     }else{
//       contract.approve(ESCROW, amt).then(()=>{
//         // the escrow contract calls the transfer once deposit() is called
//         alert("call API deposit()");
//       })
//     }
//   })
  
  
// }