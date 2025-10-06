// lib/blockchain.ts
//Allblockchain logic is here,functions are called in harvestService.ts like the same way IPFS is handled
import { ethers} from 'ethers'; // Update this import
import TraceabilityContract from '@/utils/Traceability.json';

// Ensure all required environment variables are set.
if (!process.env.ALCHEMY_AMOY_URL || !process.env.SERVER_WALLET_PRIVATE_KEY || !process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
    throw new Error("Missing required blockchain environment variables.");
}

/**
 * Submits a batch record to the blockchain for immutable logging.
 * @param batchId The unique ID of the batch from our database.
 * @param ipfsCid The IPFS Content ID for the batch's data.
 * @returns The blockchain transaction hash.
 */
export async function submitBatchToBlockchain(batchId: number, ipfsCid: string): Promise<string> {
  try {
    // 1. Connect to the blockchain network
    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_AMOY_URL);
    
    // 2. Create a server wallet instance
    const wallet = new ethers.Wallet(process.env.SERVER_WALLET_PRIVATE_KEY!, provider);
    
    // 3. Get an instance of the deployed smart contract
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
     TraceabilityContract as any, // <-- THE FIX IS HERE
      wallet
    );

    // 4. Call the 'addBatch' function on the contract and wait for confirmation
    console.log(`Submitting batch ID ${batchId} to the blockchain...`);
    const tx = await contract.addBatch(batchId, ipfsCid);
    const receipt = await tx.wait(); // Wait for the transaction to be mined
    
    console.log(`Transaction confirmed! Hash: ${receipt.hash}`);
    
    // 5. Return the transaction hash as proof
    return receipt.hash;

  } catch (error) {
    console.error("Blockchain transaction failed:", error);
    // Re-throw the error to be handled by the calling service
    throw new Error("Failed to submit transaction to the blockchain.");
  }
}