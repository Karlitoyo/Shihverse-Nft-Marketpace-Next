
/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { BaseLayout, NftList } from '@ui';

import nfts from '../content/meta.json';
import { NftMetaData } from '@_types/nft';
import { useWeb3 } from '@providers/web3';

const Home: NextPage = () => {
  const { provider, contract } = useWeb3();

  const getNftInfo = async () => {
    console.log(await contract!.name());
    console.log(await contract!.symbol());
  }

  if (contract) {
    getNftInfo();
  }

  const getAccounts = async () => {
    const accounts = await provider!.listAccounts();
    console.log(accounts[0]);
  }

  if (provider) {
    getAccounts();
  }

  return (
    <BaseLayout>

      {/* {`Is Loading: ${isLoading}`} */}

      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Shih Verse NFTs</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              All your NFT's in one doggy dogg world!
            </p>
          </div>

          <NftList
            nfts={nfts as NftMetaData[]}
          />

        </div>
      </div>
    </BaseLayout>
  )
}

export default Home