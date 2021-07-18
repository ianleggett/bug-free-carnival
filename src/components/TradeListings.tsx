import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import React, { useEffect } from "react";
import { formatUnits } from "@ethersproject/units";
import { Depositor } from "./depositer";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export const TradeListings = ({ symbol, address, decimals }) => {
  const { account, library } = useWeb3React<Web3Provider>()
  const { data: balance, mutate } = useSWR([address, 'balanceOf', account])

  if (!balance) {
    return <div>{address} Token bal not found</div>
  }
  return (
    <div>    
      {/*
        Simulate a number of offers from a list here. The amt for each offer is
        */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
        Offer, Sell 123 USDT => 456 AUD
          </Typography>
        </CardContent>
        <CardActions>
          <Depositor {...{ amt: 123 * (10**decimals), symbol, address, decimals }} />
        </CardActions>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
        Offer, Sell 56700 USDT => 456765 AUD
          </Typography>
        </CardContent>
        <CardActions>
          <Depositor {...{ amt: 567 * (10**decimals), symbol, address, decimals }} />
        </CardActions>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
      Offer, Sell 10700 USDT => 45376 AUD
          </Typography>
        </CardContent>
        <CardActions>
          <Depositor {...{ amt: 107 * (10**decimals), symbol, address, decimals }} />
        </CardActions>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
   Offer, Sell 2356400 USDT => 377584 AUD
          </Typography>
        </CardContent>
        <CardActions>
          <Depositor {...{ amt: 23564 * (10**decimals), symbol, address, decimals }} />
        </CardActions>
      </Card>

    </div>
  )
}

