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
server.post("/write", async (request, reply) => {
    const payload = request.body;
    const contract = new web3.eth.Contract(Book_json_1.abi, "0x0c016B1Ab47959e8EC2252A322182d2807300637");
    const private_key = process.env.WALLET_KEY;
    console.log(private_key, "private_key");
    const account = web3.eth.accounts.privateKeyToAccount(private_key);
    web3.eth.accounts.wallet.add(private_key);
    const gasLimit = (await web3.eth.getBlock("latest")).gasLimit;
    await contract.methods
        .writeMessage(payload.writer, `"${payload.message}" by ${payload.writer}`)
        .send({ from: account.address, gasLimit }, (error, txHash) => {
        console.error(error, "writeMessage (error)");
        console.log(txHash, "writeMessage (txHash)");
        reply.send(txHash);
    });
});
server.post("/read", async (request, reply) => {
    const payload = request.body;
    const contract = new web3.eth.Contract(Book_json_1.abi, "0x0c016B1Ab47959e8EC2252A322182d2807300637");
    const message = await contract.methods.readMessage(payload.writer).call();
    console.log(message, "message");
    reply.send(message);
});
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
