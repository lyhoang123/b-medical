import { MEDICAL_FACTORY_ADDRESS, MEDICAL_FACTORY_METHODS } from "configs";
import { parseEther } from "ethers";
import { callContract, getMedicalFactoryContract } from "hooks/useContract";
import { uploadIPFS } from "services/upload-ipfs";

export const registerProvider = async (library, account, provider) => {
  if (!library || !account) throw Error("no signer or provider");
  try {
    const medicalContract = await getMedicalFactoryContract(library, account);
    const url = await uploadIPFS(provider);
    return callContract(
      medicalContract,
      MEDICAL_FACTORY_METHODS.registerProvider,
      [account, url]
    );
  } catch (error) {
    throw error;
  }
};
