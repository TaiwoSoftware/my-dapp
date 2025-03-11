import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");

  // Connect Wallet
  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } else {
      alert("MetaMask is required to connect.");
    }
  }

  // Handle Note Input
  function handleNoteChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewNote(event.target.value);
  }

  // Save New Note
  function saveNote() {
    if (newNote.trim() === "") return;
    setNotes([...notes, newNote]);
    setNewNote(""); // Clear input after saving
  }

  return (
    <div className="container fade-in">
      <h1 className="title">📜 NoteChain dApp</h1>

      <button className="connect-btn" onClick={connectWallet}>
        {walletAddress ? `✅ Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "🔗 Connect Wallet"}
      </button>

      <div className="note-form">
        <input
          type="text"
          placeholder="✍️ Enter a new note..."
          value={newNote}
          onChange={handleNoteChange}
        />
        <button className="add-btn" onClick={saveNote}>➕ Save Note</button>
      </div>

      <h2 className="notes-title">📖 Stored Notes</h2>
      <ul className="notes-list">
        {notes.length === 0 ? (
          <p className="empty-message">No notes added yet!</p>
        ) : (
          notes.map((note, index) => <li key={index} className="note-item">{note}</li>)
        )}
      </ul>
    </div>
  );
}

export default App;
