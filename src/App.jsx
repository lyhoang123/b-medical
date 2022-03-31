import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Routes } from "components/route/Routes";
import { useEagerConnect, useInactiveListener } from "connectors/hooks";
import CensorPage from "pages/CensorPage";
import NotFound from "pages/NotFound";
import { useEffect, useState } from "react";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  const { connector } = useWeb3React();

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return <Routes />;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
