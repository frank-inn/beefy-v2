import { AmmConfig } from '../../features/data/apis/config-types';

export const amms: AmmConfig[] = [
  {
    id: 'optimism-velodrome',
    name: 'Velodrome',
    type: 'solidly',
    routerAddress: '0xa132DAB612dB5cB9fC9Ac426A0Cc215A3423F9c9',
    factoryAddress: '0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746',
    pairInitHash: '0xc1ac28b1c4ebe53c0cff67bab5878c4eb68759bb1e9f73977cd266b247d149f0',
    swapFee: 0.0002,
    getAmountOutMode: 'getAmountOut',
  },
];
