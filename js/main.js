import "babel-polyfill";

async function demo () {
  const provider = window.SubWallet;

  console.log(provider.isConnected());

  const result = await provider.request({method: 'eth_requestAccounts'});

  console.log(result);

  const currentChainId = await provider.request({method: 'eth_chainId'});

  console.log(currentChainId);

  console.log(parseInt(currentChainId, 16));

  const astarChainId = `0x${(592).toString(16)}`;

  console.log(astarChainId);

  await provider.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {chainId: astarChainId}
    ]
  });
}

demo();
