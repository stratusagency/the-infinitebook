![logo](https://assets.stratusagency.io/logo-large-black.svg)

![photo](https://assets.stratusagency.io/the-infinitebook.png)

⚠️ This project is still at its early stages, so please wait its complete build to use it at 100 %.

# The InfiniteBook

The InfiniteBook is a PoC (proof-of-concept) of writing in blockchain, specifically in Base.
In this repo, you will can write your thoughts and let them forever, within Base and in no other blockchains.

[Discover Base](https://base.org/)

## What We Use
- Hardhat
- TypeScript
- Solidity
- NPM
- Next.js
- React.js
- Tailwind CSS

## Usage

1. Create the `.env` file in back-end side:
```
cd backend/ && touch .env
```

2. Setup the private key of your signer wallet in `.env` file:
```
WALLET_KEY=YOUR PRIVATE KEY
CONTRACT_ADDRESS=0x0c016B1Ab47959e8EC2252A322182d2807300637 (or your own Book, see below)
```

3. Install depedencides with NPM:
```
cd backend/ && npm i
```

4. *If you want to get your own Book,* then compile and get the ABI of the smart contract:
```
npm run compile
```

5. *If you want to get your own Book,* then deploy it and replace the address with the new in `.env` file:
```
npm run deploy
```

6. **On a first terminal,** build and launch the backend server in localhost:
```
npm run build && npm start
```

7. **On a second terminal,** go to the front-end side and install the depedencies:
```
cd ../ && cd frontend/app/ && npm i
```

8. Then launch the website in localhost:
```
npm run dev
```

🎉 Congrats, you can now write your handsome poems within Base on [`https://localhost:3000/`](https://localhost:3000/) !