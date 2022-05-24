import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";


type AccountHookFactory = CryptoHookFactory<string>

export type UseAccountHook = ReturnType<AccountHookFactory>

export const hookFactory: AccountHookFactory = ({ provider, ethereum }) => () => {

    const swrRes = useSWR(
        provider ? "web3/useAccount" : null,
        async () => {
            const accounts = await provider!.listAccounts();
            const account = accounts[0];

            if (!account) {
                throw "Cannot retrieve account! Please connect to web3 wallet."
            }

            return account;
        }, {
        revalidateOnFocus: false
    }
    )

    const connect = async () => {
        try {
            ethereum?.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.error(error);
        }

    }

    return {
        swrRes,
        connect
    };
}
