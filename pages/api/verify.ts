import { v4 as uuidv4 } from "uuid";
import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession, contractAddress, addressCheckMiddleware, pinataApiKey, pinataSecretApiKey } from "./utils";
import { NftMetaData } from "@_types/nft";
import axios from "axios";

export default withSession(async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const { body } = req;
            const nft = body.nft as NftMetaData

            if (!nft.name || !nft.description || !nft.attributes) {
                return res.status(422).send({ message: "Some of the form data is missing" })
            }

            await addressCheckMiddleware(req, res);

            const jsonRes = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
                pinataMetaData: {
                    name: uuidv4()
                },
                pinataContent: nft
            }, {
                headers: {
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            });

            return res.status(200).send(jsonRes.data);

        } catch (e: any) {
            res.status(422).send({ message: "Cannot create JSON" });
        }
    }
    else if (req.method === "GET") {
        try {
            const message = { contractAddress, id: uuidv4() };
            req.session.set("message-session", message);
            await req.session.save();

            res.json(message);
        } catch {
            res.status(422).send({ message: "Cannot generate a message!" });
        }
    } else {
        res.status(200).json({ message: "Invalid api route" });
    }
}) 