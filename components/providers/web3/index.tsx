import { useState, useContext, FunctionComponent, createContext } from "react";
import { Web3State, createDefaultState } from "./utils";


const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent = ({ children }) => {

    const [web3Api, setWbe3Api] = useState<Web3State>(createDefaultState())


    return (
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    )

}

export function useWeb3() {
    return useContext(Web3Context);
}

export default Web3Provider;
