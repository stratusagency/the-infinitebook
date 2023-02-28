"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const web3_1 = __importDefault(require("web3"));
const Book_json_1 = require("./artifacts/contracts/Book.sol/Book.json");
// Parsing the env file.
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "./.env") });
const server = (0, fastify_1.default)({
    logger: true,
});
const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://fragrant-cold-asphalt.base-goerli.discover.quiknode.pro/a8c8e01e49988dab2d6d76d85491b12ae9748ac8/"));
const contract = new web3.eth.Contract(Book_json_1.abi, process.env.CONTRACT_ADDRESS);
server.post("/write", async (request, reply) => {
    const payload = request.body;
    const private_key = process.env.WALLET_KEY;
    const account = web3.eth.accounts.privateKeyToAccount(private_key);
    web3.eth.accounts.wallet.add(private_key);
    const gasLimit = (await web3.eth.getBlock("latest")).gasLimit;
    await contract.methods
        .writeMessage(payload.writer, payload.message)
        .send({ from: account.address, gasLimit }, (error, txHash) => {
        console.error(error, "writeMessage (error)");
        reply.send(txHash);
    });
});
server.post("/read", async (request, reply) => {
    const payload = request.body;
    const message = await contract.methods.readMessage(payload.writer).call();
    reply.send(message);
});
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
