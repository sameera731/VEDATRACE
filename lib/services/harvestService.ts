// lib/services/harvestService.ts

import { prisma } from "@/lib/prisma";
import { uploadToIPFS } from "@/lib/ipfs";
import { submitBatchToBlockchain } from "@/lib/blockchain"; // <-- Import the new function

export const harvestService = {
  async findByFarmer(userName: string) {
    return prisma.harvest.findMany({
      where: { farmerUserName: userName },
      orderBy: { timestamp: "desc" },
    });
  },

  async create(data: any, user: any) {
    // 1. Insert into DB first
    const batchId = crypto.randomUUID();
    const city = user.City || user.city || null;
    const state = user.state || null;
    const harvest = await prisma.harvest.create({
      data: {
        Herb_type: data.Herb_type,
        scientific_name: data.scientific_name,
        quantity_magnitude: data.quantity_magnitude,
        quantity_unit: data.quantity_unit,
        color_name: data.color_name,
        longitude: data.longitude,
        latitude: data.latitude,
        date_of_sending_harvest: data.date_of_sending_harvest
          ? new Date(data.date_of_sending_harvest)
          : null,
        Batch_id: batchId,
        farmerUserName: data.farmerUserName,
        city,
        state,
      },
    });

    // 2. Upload to IPFS
    const ipfsData = { ...harvest, city, state };
    const cid = await uploadToIPFS(ipfsData);

    // 3. Update harvest with CID
    const updatedHarvestWithCid = await prisma.harvest.update({
      where: { Harvest_id: harvest.Harvest_id },
      data: { cid_of_harvest: cid },
    });

    // 4. Call the new blockchain service function
    const transactionHash = await submitBatchToBlockchain(
      parseInt(updatedHarvestWithCid.Harvest_id),
      updatedHarvestWithCid.cid_of_harvest!
    );

    // 5. Save the transaction hash to the database
    const finalHarvest = await prisma.harvest.update({
        where: { Harvest_id: updatedHarvestWithCid.Harvest_id }, // <-- THE FIX IS HERE
        data: { transactionHash: transactionHash }
    });

    return finalHarvest;
  },
};