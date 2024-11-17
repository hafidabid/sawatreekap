import { useAuth } from "@/providers/authProvider";
import OnchainProviders from "@/providers/coinbaseDevProvider";
import { NFTCard } from "@coinbase/onchainkit/nft";
import {
  NFTLastSoldPrice,
  NFTMedia,
  NFTNetwork,
  NFTOwner,
  NFTTitle,
} from "@coinbase/onchainkit/nft/view";
import { useEffect, useState } from "react";
import NFTDisplay from "./NFTMedia";
// import NFTCard from './NFTCard';

const AchievementTab: React.FC = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [treePlanting, setTreePlanting] = useState<any[]>([]);
  const { token, address } = useAuth();

  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/my-awards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch achievements");
      }
      setAchievements(data.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  const fetchTreePlanting = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/my-tree`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch achievements");
      }
      setTreePlanting(data.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
    fetchTreePlanting();
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-md max-w-4xl ml-0">
      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-green-300 mb-4">
          Quest Achievements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {questNFTs.map((nft) => (
                        <NFTCard key={nft.id} title={nft.title} description={nft.description} imageUrl={nft.imageUrl} />
                    ))} */}
          {achievements.map((nft) => (
            <NFTDisplay
              networkRPC={nft.quest.nft_rpc_url}
              contractAddress={nft.quest.nft_contract_address}
              tokenId={1}
              blockscoutBaseUrl={"https://polygon.blockscout.com"}
              defaultImage={
                "https://sgp1.digitaloceanspaces.com/blastbirds-assets/tokenscripts/mission_nft.png"
              }
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-green-300 mb-4">
          Tree Planting Achievements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {treeNFTs.map((nft) => (
                        <NFTCard key={nft.id} title={nft.title} description={nft.description} imageUrl={nft.imageUrl} />
                    ))} */}
          {treePlanting.map((nft) => (
            <NFTDisplay
              networkRPC={`https://polygon-mainnet.infura.io/v3/bb83c60ddd744e99be87baba2a359d11`}
              contractAddress={`0x53e4a3299f973e618b6a616388124337aeba3709`}
              tokenId={1}
              blockscoutBaseUrl={"https://polygon.blockscout.com"}
              defaultImage={
                "https://sgp1.digitaloceanspaces.com/blastbirds-assets/tree_nft.png"
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AchievementTab;
