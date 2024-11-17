"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";

interface NFTDisplayProps {
  networkRPC: string;
  contractAddress: string;
  tokenId: number;
  blockscoutBaseUrl: string; // Base URL for Blockscout (e.g., "https://blockscout.com/eth/mainnet")
  defaultImage?: string;
}

const NFTDisplay: React.FC<NFTDisplayProps> = ({
  networkRPC,
  contractAddress,
  tokenId,
  blockscoutBaseUrl,
  defaultImage,
}) => {
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTMedia = async () => {
      try {
        setLoading(true);
        // Set up a provider and the contract instance
        const provider = new ethers.JsonRpcProvider(networkRPC);
        const contract = new ethers.Contract(
          contractAddress,
          [
            // ABI for ERC-721 `tokenURI` method
            "function tokenURI(uint256 tokenId) view returns (string)",
          ],
          provider
        );

        // Fetch the token URI
        const tokenURI: string = await contract.tokenURI(tokenId);
        console.log("Token URI:", tokenURI);

        // If the tokenURI is an IPFS link, replace it with a gateway URL
        const resolvedURI = tokenURI.startsWith("ipfs://")
          ? `https://ipfs.io/ipfs/${tokenURI.slice(7)}`
          : tokenURI;

        // Fetch the metadata
        const response = await fetch(resolvedURI);
        if (!response.ok) throw new Error("Failed to fetch metadata");
        try {
          const metadata = await response.json();

          // Assume the media is located in the `image` property of the metadata
          setMediaUrl(metadata.image ?? defaultImage);
        } catch (err) {
          setMediaUrl(defaultImage ?? "");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTMedia();
  }, [networkRPC, contractAddress, tokenId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex p-2 border-white border-2 rounded">
        <a
          href={`${blockscoutBaseUrl}/address/${contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginBottom: "10px",
            display: "inline-block",
            textDecoration: "underline",
            color: "blue",
          }}
        >
          View Contract on Blockscout
        </a>
      </div>
      {mediaUrl ? (
        <img
          src={mediaUrl}
          alt={`NFT ${tokenId}`}
          style={{ maxWidth: "100%", maxHeight: "500px" }}
        />
      ) : (
        <p>No media found for this NFT.</p>
      )}
    </div>
  );
};

export default NFTDisplay;
