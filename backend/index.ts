import fastify, { FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";
import path from "path";

import { AbiItem } from "web3-utils";
import Web3 from "web3";

import { abi } from "./artifacts/contracts/Book.sol/Book.json";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "./.env") });

interface WriterPayload {
  writer: string;
  message: string;
}

interface ReaderPayload {
  writer: string;
}

const server = fastify<Server, IncomingMessage, ServerResponse>({
  logger: true,
});

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://fragrant-cold-asphalt.base-goerli.discover.quiknode.pro/a8c8e01e49988dab2d6d76d85491b12ae9748ac8/"
  )
);

const contract = new web3.eth.Contract(
  abi as AbiItem[],
  process.env.CONTRACT_ADDRESS
);

server.post(
  "/write",
  async (request: FastifyRequest<{ Body: WriterPayload }>, reply) => {
    const payload: WriterPayload = request.body;

    const private_key: string = process.env.WALLET_KEY as string;

    const account = web3.eth.accounts.privateKeyToAccount(private_key);
    web3.eth.accounts.wallet.add(private_key);

    const gasLimit = (await web3.eth.getBlock("latest")).gasLimit;

    await contract.methods
      .writeMessage(payload.writer, payload.message)
      .send({ from: account.address, gasLimit }, (error: any, txHash: any) => {
        console.error(error, "writeMessage (error)");
        reply.send(txHash);
      });
  }
);

server.post(
  "/read",
  async (request: FastifyRequest<{ Body: WriterPayload }>, reply) => {
    const payload: ReaderPayload = request.body;

    const message = await contract.methods.readMessage(payload.writer).call();
    reply.send(message);
  }
);

server.get("/messages", async (_request, _reply) => {
  const messages = await contract.methods.getMessages().call();
  return messages;
});

server.get("/", async (_request, _reply) => {
  return { contract_address: process.env.CONTRACT_ADDRESS };
});

server.listen({ port: 8080 }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
