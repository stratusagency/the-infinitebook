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

server.post(
  "/write",
  async (request: FastifyRequest<{ Body: WriterPayload }>, reply) => {
    const payload: WriterPayload = request.body;

    const contract = new web3.eth.Contract(
      abi as AbiItem[],
      "0x0c016B1Ab47959e8EC2252A322182d2807300637"
    );

    const private_key: string = process.env.WALLET_KEY as string;

    console.log(private_key, "private_key");

    const account = web3.eth.accounts.privateKeyToAccount(private_key);
    web3.eth.accounts.wallet.add(private_key);

    const gasLimit = (await web3.eth.getBlock("latest")).gasLimit;

    await contract.methods
      .writeMessage(payload.writer, payload.message)
      .send({ from: account.address, gasLimit }, (error: any, txHash: any) => {
        console.error(error, "writeMessage (error)");
        console.log(txHash, "writeMessage (txHash)");
        reply.send(txHash);
      });
  }
);

server.post(
  "/read",
  async (request: FastifyRequest<{ Body: WriterPayload }>, reply) => {
    const payload: ReaderPayload = request.body;

    console.log(payload, 'payload');
    

    const contract = new web3.eth.Contract(
      abi as AbiItem[],
      "0x0c016B1Ab47959e8EC2252A322182d2807300637"
    );

    const message = await contract.methods.readMessage(payload.writer).call();
    console.log(message, "message");
    reply.send(message);
  }
);

server.get("/", async (_request, _reply) => {
  return "Requests: /write (POST) and /read (GET)";
});

server.listen({ port: 8080 }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
