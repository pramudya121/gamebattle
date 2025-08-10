let contract;

async function initContract() {
  const response = await fetch("[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "defender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "damage",
				"type": "uint256"
			}
		],
		"name": "attack",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "attacker",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "defender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "damage",
				"type": "uint256"
			}
		],
		"name": "Attacked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "GameStarted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "startGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			}
		],
		"name": "getHealth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "health",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]");
  const abi = await response.json();
  const address = "0xbe19590e1bb4067049427Cf942f82205F3886985";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  contract = new ethers.Contract(address, abi, signer);
}

window.addEventListener("load", initContract);

async function startGame() {
  try {
    const tx = await contract.startGame();
    await tx.wait();
    alert("Game Started!");
  } catch (err) {
    alert("Error: " + err.message);
  }
}

async function attack() {
  const defender = document.getElementById("defender").value;
  const damage = parseInt(document.getElementById("damage").value);
  try {
    const tx = await contract.attack(defender, damage);
    await tx.wait();
    alert(`Attacked ${defender} with ${damage} damage!`);
  } catch (err) {
    alert("Error: " + err.message);
  }
}

async function getHealth() {
  const player = document.getElementById("player").value;
  try {
    const health = await contract.getHealth(player);
    alert(`${player} has ${health} health.`);
  } catch (err) {
    alert("Error: " + err.message);
  }
}
