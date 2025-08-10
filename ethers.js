async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask to use this app.");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    alert("Wallet connection rejected.");
  }
}
connectWallet();
