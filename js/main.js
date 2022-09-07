import "babel-polyfill";
async function demo_evm () {
  const provider = window.SubWallet;

  console.log(provider.isConnected());

  // Get accounts if already connected previously, otherwise request authorization
  const result = await provider.request({method: 'eth_requestAccounts'});

  console.log(result);

  // current chainId;
  const currentChainId = await provider.request({method: 'eth_chainId'});

  console.log('we are on network with id: ', parseInt(currentChainId, 16));

  if (81 === parseInt(currentChainId, 16)) {
    console.log('We are on Shibuya network !');
  } else {
    console.log('Not on Shibuya network, requesting change');

    const astarChainId = `0x${(81).toString(16)}`;

    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {chainId: astarChainId}
      ]
    });

    console.log('Changing network done');
  }

  const txHash = await provider.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: '0x40a207109cf531024B55010A1e760199Df0d3a13',
        to: '0xcf73692d3e64c51C429de56b5214891056F023B3',
        value: `0x${(1.5 * 10 ** 18).toString(16)}`
      }
    ]
  });

  console.log('txHash', txHash);
}

async function demo_substrate () {

  setTimeout(async () => {
    const provider = window.injectedWeb3['subwallet-js'];
    console.log(provider);

    const wallet = await provider.enable();

    console.log(wallet);

    const allAccounts = await wallet.accounts.get();

    const address = allAccounts[1].address;

    console.log(address);

    await wallet.signer.signRaw(
      {
        address,
        data: 'This is dummy message',
        type: 'bytes'
      }
    );
  }, 1000);
}

demo_substrate();
