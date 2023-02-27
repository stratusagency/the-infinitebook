import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [write, setWrite] = useState({
    address: "",
    message: "",
    response: "",
  });

  const [read, setRead] = useState({
    address: "",
    response: "",
  });

  const handleWriteMessage = (e: any) => {
    e.preventDefault();

    if (write.address !== "" && write.message !== "")
      fetch("http://localhost:8080/write", {
        method: "POST",
        body: JSON.stringify({
          writer: write.address,
          message: write.message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const text = await response.text();
        setWrite({ ...write, response: text });
      });
    else alert("Please enter your address and what you want to write");
  };

  const handleReadMessages = (e: any) => {
    e.preventDefault();

    if (read.address !== "")
      fetch("http://localhost:8080/read", {
        method: "POST",
        body: JSON.stringify({
          writer: read.address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const text = await response.text();
        console.warn(text, "readMessage");
        setRead({ ...read, response: text });
      });
    else alert("Please enter the address of the writer you want to see");
  };

  return (
    <>
      <Head>
        <title>The InfiniteBook</title>
      </Head>

      <div className="flex h-screen justify-center items-center">
        <div className="flex align-center space-evenly">
          <div className="w-full max-w-xs m-10">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-gray-800 font-bold">
                Write Messages As A Writer
              </h1>

              {write.response !== "" ? (
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Response: « {write.response} »
                </p>
              ) : undefined}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="0x..."
                  value={write.address}
                  onChange={(e) =>
                    setWrite({ ...write, address: e.target.value })
                  }
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your Message
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                  value={write.message}
                  onChange={(e) =>
                    setWrite({ ...write, message: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleWriteMessage}
                >
                  Submit
                </button>
              </div>
            </form>
            <a
              href="https://stratusagency.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="hover:underline text-center text-gray-500 text-xs">
                Made with ❤️ by &copy;2023 STRATUS.
              </p>
            </a>
          </div>

          <div className="w-full max-w-xs m-10">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-gray-800 font-bold">
                Read Messages From A Writer
              </h1>

              {read.response !== "" ? (
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Response: « {read.response} »
                </p>
              ) : undefined}

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="0x..."
                  value={read.address}
                  onChange={(e) =>
                    setRead({ ...read, address: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleReadMessages}
                >
                  Submit
                </button>
              </div>
            </form>
            <a
              href="https://stratusagency.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="hover:underline text-center text-gray-500 text-xs">
                Made with ❤️ by &copy;2023 STRATUS.
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
