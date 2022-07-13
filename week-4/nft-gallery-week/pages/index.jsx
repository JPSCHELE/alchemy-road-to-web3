import Head from 'next/head';
import Image from 'next/image';
import NFTCard from './components/nftCard';
import { useState } from 'react';

const Home = () => {
    const [wallet, setWalletAddress] = useState("");
    const [collection, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState([]);
    const [fetchForCollection, setFetchForCollection] = useState(false);
    const apiKey = "h2v4yWjtfeURttVMwEWcGT3eBCGDVwTm"

    const fetchNFTs = async () => {
        let nfts;
        
        const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
        if(!collection.length){
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
                };
                const fetchURL = `${baseURL}?owner=${wallet}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
        } else {
            const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
            nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
        }

        if(nfts){
           setNFTs(nfts.ownedNfts); 
        }
    }

    const fetchNFTsForCollection = async() => {
        const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection/`;
        if (collection.length) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
                };
            const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true`;
            const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
            if(nfts) {
                console.log(nfts);
                setNFTs(nfts.nfts);
            }
        }
    }
    // 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D <- contract
    //0xed2ab4948bA6A909a7751DEc4F34f303eB8c7236 <- holder 
    // 0x3d7BeEE691Ceb63879Fd59c5f93e7F29eeF3e8D3 <- mia
    return (
        <div className="flex flex-col items-center justify-center py-8 gap-y-3">
        <div className="flex flex-col w-full justify-center items-center gap-y-2">

        <input disabled={fetchForCollection} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => setWalletAddress(e.target.value)} type={'text'} placeholder='Add your wallet address'></input>
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => setCollectionAddress(e.target.value)} type={'text'} placeholder='Add the collection address'></input>
        <label>
            <input onChange={(e) => setFetchForCollection(e.target.checked)}type={'checkbox'}></input>search collection
        </label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
            () => {
               if(fetchForCollection) {
                fetchNFTsForCollection()
               } else {
                fetchNFTs()
               }
            }
        }>Get NFTS</button>
        
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
                <NFTCard nft={nft}></NFTCard>
              )
          })
        }
      </div>
        </div>
        </div>
    );
};

export default Home;
