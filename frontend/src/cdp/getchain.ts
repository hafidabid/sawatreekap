import { base, sepolia, polygon, polygonAmoy } from "viem/chains";

export function GetChain(){
    const chain = process.env.NEXT_PUBLIC_CHAIN_SELECTION ?? ''

    switch(chain.toLowerCase()){
        case 'sepolia':
            return sepolia
        case 'base':
            return base
        case 'polygon':
            return polygon
        case 'polygonamoy':
            return polygonAmoy
        default:
            return sepolia
    }
}