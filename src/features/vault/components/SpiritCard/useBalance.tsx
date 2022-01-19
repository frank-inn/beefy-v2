import { useState, useEffect } from 'react';
import { ZERO_ADDRESS, web3BNToFloatString } from './utils';
import { getERC20Contract } from '../../../../helpers/getERC20Contract';
import BigNumber from 'bignumber.js';
import { useSelector } from 'react-redux';
import { byDecimals } from '../../../../helpers/format';

export function useBalance(tokenAddress, decimals, network) {
  const [balance, setBalance] = useState(new BigNumber(0));
  const [balanceString, setBalanceString] = useState('0');

  const { wallet } = useSelector((state: any) => ({
    wallet: state.walletReducer,
  }));

  const web3 = wallet.rpc[network];
  const account = wallet.address;

  useEffect(() => {
    let isCancelled = false;

    function getBalance() {
      return new Promise<BigNumber>(resolve => {
        if (!web3 || !tokenAddress) {
          resolve(new BigNumber(0));
          return;
        }

        try {
          if (tokenAddress === ZERO_ADDRESS) {
            web3.eth
              .getBalance(account)
              .then(value => {
                resolve(new BigNumber(value));
              })
              .catch(error => {
                console.log(error);
                resolve(new BigNumber(0));
              });
          } else {
            const contract = getERC20Contract(tokenAddress, web3);
            contract?.methods
              .balanceOf(account)
              .call()
              .then(value => {
                resolve(new BigNumber(value));
              })
              .catch(error => {
                console.log(error);
                resolve(new BigNumber(0));
              });
          }
        } catch (error) {
          resolve(new BigNumber(0));
        }
      });
    }

    async function run() {
      const bn = await getBalance();
      if (!isCancelled) {
        const pow = new BigNumber('10').pow(new BigNumber(decimals));
        setBalance(byDecimals(bn, decimals));
        setBalanceString(web3BNToFloatString(bn, pow, 2, BigNumber.ROUND_DOWN));
      }
    }

    run();

    return () => {
      isCancelled = true;
    };
  }, [tokenAddress, web3, decimals, account]);

  return [balance, balanceString];
}
