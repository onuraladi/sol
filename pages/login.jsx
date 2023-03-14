import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram, useClaimNFT, useClaimConditions, useLogin, } from "@thirdweb-dev/react/solana";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Login.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
const Login = () => {
  const { program } = useProgram("55fF192U2FNQBMR6wapseZcXAHYJvM11wp44MWJtr3q8", "nft-drop");
  const { mutateAsync: claim, isLoading } = useClaimNFT(program);
  const {data: conditions, isLoading: conditionsIsLoading} = useClaimConditions(program);
  const {publicKey} = useWallet();
  const login = useLogin();
  
  
  
  
   return (
    <div className={styles.page}>
    <div className={styles.header}>
    <WalletMultiButtonDynamic />
    </div>
    <br />

    
        <p>Sol Network : DEVNET</p>
     

        <div className={styles.iconContainer}>
         
          
          <Image
            width={400}
            height={400}
            src="/8.png"
            className={styles.icon}
            alt="sol"
          />
       
        <h1 className={styles.h1}>Solana, meet USB 👋</h1>
        <p className={styles.explain}>
          Bridge your University Societies in {" "}
          <b>
            <a
              href="https://twitter.com/unisolbridge"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lightPurple}
            >
              Solana 
            </a>
          </b>
          {" "}Ecosystem.
        </p>
        {!publicKey ? <p>Connect Your Wallet</p> : <>
      
       <div>
       
       <button className={styles.btn}  onClick={() => login()}>
       <a
              href="https://twitter.com/unisolbridge"
             
              rel="noopener noreferrer"
              className={styles.lightPurple}
            > Login 
            </a>
     
     </button>
      <p>you can only login if you have access nft</p>
       </div>

        <button className={styles.btn} disabled={isLoading} onClick={() => claim({amount: 1})}>
      Claim USB NFT's to pass the bridge.
    </button>
    <p>{conditions?.totalAvailableSupply}/{conditions?.claimedSupply}</p>
     
    </>}
      </div>
    </div>
  );
};

export default Login;
