import {
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTokenSupply,
  Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, utils } from "ethers";
import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { parseIneligibility } from "../utils/parseIneligibility";
import { ApeDaoContext } from "../components/Context/solutions";
import { useContext, useEffect } from "react";
// .container {
//   margin-top: 96px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100vw;
//   padding: 0 24px;
// }

const style = {
  wrapper: `relative w-full pt-32 h-screen bg-indigo-900 flex flex-col   items-center  `,
  mintwrapper: ` p-2 w-full mt-80 bg-indigo-900 flex justify-center flex-col items-center  `,
  topContent: `flex h-screen flex-col items-center rounded-xl p-4 w-4/5 justify-center `,
  topItemsContainer: `flex  justify-between  mt-8  rounded-xl p-8 w-4/5 `,
  ammtContainer: `flex text-sky-400 mt-2  flex-col rounded-xl  w-full `,
  topContents: `flex flex-col items-center rounded-xl p-8 w-4/5 justify-center `,
  formInputContainer: `p-2 mt-4 flex rounded border w-2/3 items-center justify-center `,
  formInput: `p-2 mb-2   w-full bg-transparent h-96`,
  formTitle: `text-2xl font-bold text-slate-600`,
  button: ` flex shadow-xl mt-8  w-[500px] bg:white hover:bg-gradient-to-r from-indigo-500   via-pink-500 to-pink-500 p-[0.8rem]  items-center justify-center h-16  rounded-lg cursor-pointer text-black`,
  buttonText: ` text-xl font-semibold p-3 text-slate-200 hover:text-slate-400   `,
};

const Home = () => {
  const tokenAddress = "0x3155be01BEB8C73710654C3BcA166fD78464BCFa";
  const { contract: contract, isLoading: isTokenLoading } = useContract(
    tokenAddress,
    "token-drop"
  );
  const { contract: editionDrop } = useContract(
    "0xa85caec09986d1AC483709A960bD1cCa972E3c44",
    "edition-drop"
  );
  const {
    address,
    nftBalance,
    daoMember,
    GetTreasureBalance,
    GetTreasureBalanceNative,
  } = useContext(ApeDaoContext);

  const [hasMembership, setHasMembership] = useState(false);

  useEffect(() => {
    if (daoMember > 0) setHasMembership(true);
    console.log({ daoMember });
  }, [nftBalance]);

  const minIt = async () => {
    try {
      const tokenId = 0;
      const quantity = 1;

      const tx = await editionDrop.claimTo(address, tokenId, quantity);

      const receipt = tx.receipt;
    } catch (error) {
      console.log({ error });
    }
    // window.location.reload();
  };

  const [quantity, setQuantity] = useState(1);
  const { data: contractMetadata } = useContractMetadata(contract);

  const claimConditions = useClaimConditions(contract);
  const activeClaimCondition = useActiveClaimConditionForWallet(
    contract,
    address
  );
  const claimerProofs = useClaimerProofs(contract, address || "");
  const claimIneligibilityReasons = useClaimIneligibilityReasons(contract, {
    quantity,
    walletAddress: address || "",
  });

  const claimedSupply = useTokenSupply(contract);

  const totalAvailableSupply = useMemo(() => {
    try {
      return BigNumber.from(activeClaimCondition.data?.availableSupply || 0);
    } catch {
      return BigNumber.from(1_000_000_000);
    }
  }, [activeClaimCondition.data?.availableSupply]);

  const numberClaimed = useMemo(() => {
    return BigNumber.from(claimedSupply.data?.value || 0).toString();
  }, [claimedSupply]);

  const numberTotal = useMemo(() => {
    const n = totalAvailableSupply.add(
      BigNumber.from(claimedSupply.data?.value || 0)
    );
    if (n.gte(1_000_000_000)) {
      return "";
    }
    return n.toString();
  }, [totalAvailableSupply, claimedSupply]);

  const priceToMint = useMemo(() => {
    // const bnPrice = BigNumber.from(
    //   activeClaimCondition.data?.currencyMetadata.value || 0
    // );
    // return `${utils.formatUnits(
    //   bnPrice.mul(quantity).toString(),
    //   activeClaimCondition.data?.currencyMetadata.decimals || 18
    // )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;

    if (quantity) {
      const bnPrice = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      return `${utils.formatUnits(
        bnPrice.mul(quantity).toString(),
        activeClaimCondition.data?.currencyMetadata.decimals || 18
      )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
    }
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimableSupply || 0
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(1_000_000_000);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimablePerWallet || 0
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(1_000_000_000);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === "0") {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(1_000_000_000);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    let max;
    if (totalAvailableSupply.lt(bnMaxClaimable)) {
      max = totalAvailableSupply;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(1_000_000_000)) {
      return 1_000_000_000;
    }
    return max.toNumber();
  }, [
    claimerProofs.data?.maxClaimable,
    totalAvailableSupply,
    activeClaimCondition.data?.maxClaimableSupply,
    activeClaimCondition.data?.maxClaimablePerWallet,
  ]);

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition.isSuccess &&
          BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
            0
          )) ||
        numberClaimed === numberTotal
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition.data?.availableSupply,
    activeClaimCondition.isSuccess,
    numberClaimed,
    numberTotal,
  ]);

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    return activeClaimCondition.isLoading || !contract;
  }, [activeClaimCondition.isLoading, contract]);

  const buttonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading || isTokenLoading,
    [claimIneligibilityReasons.isLoading, isLoading]
  );
  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return "Sold Out";
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      if (pricePerToken.eq(0)) {
        return "Claim (Free)";
      }
      return `Purchase (${priceToMint})`;
    }
    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity);
    }
    if (buttonLoading) {
      return "Checking eligibility...";
    }

    return "Claiming not available";
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    buttonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  return (
    <div className={style.wrapper}>
      {hasMembership ? (
        <div>
          {(claimConditions.data &&
            claimConditions.data.length > 0 &&
            activeClaimCondition.isError) ||
            (activeClaimCondition.data &&
              activeClaimCondition.data.startTime > new Date() && (
                <p>Drop is starting soon. Please check back later.</p>
              ))}

          {claimConditions.data?.length === 0 ||
            (claimConditions.data?.every(
              (cc) => cc.maxClaimableSupply === "0"
            ) && (
              <p>
                This drop is not ready to be minted yet. (No claim condition
                set)
              </p>
            ))}

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {contractMetadata?.image && (
                <Image
                  src={contractMetadata?.image}
                  alt={contractMetadata?.name}
                  width={300}
                  height={300}
                  style={{ objectFit: "contain" }}
                />
              )}

              <h2 className={styles.title}>Claim Tokens</h2>
              <p className={styles.explain}>
                Claim BNG tokens from{" "}
                <span className={styles.pink}>{contractMetadata?.name}</span>
              </p>
            </>
          )}

          <hr className={styles.divider} />

          <div className={styles.claimGrid}>
            <input
              type="number"
              placeholder="Enter amount to claim"
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value > maxClaimable) {
                  setQuantity(maxClaimable);
                } else if (value < 1) {
                  setQuantity(1);
                } else {
                  setQuantity(value);
                }
              }}
              value={quantity}
              className={`${styles.textInput} ${styles.noGapBottom}`}
            />
            <Web3Button
              accentColor="#5204BF"
              colorMode="dark"
              contractAddress={tokenAddress}
              action={(contract) => contract.erc20.claim(quantity)}
              onSuccess={() => alert("Claimed!")}
              onError={(err) => alert(err)}
            >
              {buttonText}
            </Web3Button>
          </div>
        </div>
      ) : (
        <div>
          <div className={style.mintwrapper}>
            <h1>Mint 🍪DAO Membership</h1>
            <button
              onClick={() => {
                minIt();
              }}
              className={style.button}
            >
              Mint
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
