import axios from 'axios';
import { MEDICAL_FACTORY_ADDRESS, MEDICAL_FACTORY_METHODS } from 'configs';
import { parseEther } from 'ethers';
import { callContract, getMedicalFactoryContract } from 'hooks/useContract';
import { uploadIPFS } from 'services/upload-ipfs';

export const registerProvider = async (library, account, provider) => {
  if (!library || !account) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library, account);
    const url = await uploadIPFS(provider);
    return callContract(medicalContract, MEDICAL_FACTORY_METHODS.registerProvider, [account, url]);
  } catch (error) {
    throw error;
  }
};

export const enterProduct = async (library, account, product, quantity) => {
  if (!library || !account) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library, account);
    const url = await uploadIPFS(product);
    return callContract(medicalContract, MEDICAL_FACTORY_METHODS.enterProduct, [url, quantity]);
  } catch (error) {
    throw error;
  }
};

export const getProductsPending = async (library) => {
  if (!library) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library);
    const ids = await callContract(medicalContract, MEDICAL_FACTORY_METHODS.getProductsPending, []);
    return Promise.all(
      ids.map(async (id) => {
        const url = await callContract(medicalContract, MEDICAL_FACTORY_METHODS._products, [id]);
        const res = await axios.get(url);
        return { ...res.data, id };
      })
    );
  } catch (error) {
    throw error;
  }
};

export const approveOrRejectProduct = async (library, account, id, approve = true) => {
  if (!library || !account) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library, account);
    return callContract(medicalContract, MEDICAL_FACTORY_METHODS.approveOrRejectProduct, [id, approve]);
  } catch (error) {
    throw error;
  }
};

export const getProductsSoldMarketplace = async (library) => {
  if (!library) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library);
    const ids = await callContract(medicalContract, MEDICAL_FACTORY_METHODS.getProductsSoldMarketplace, []);
    return Promise.all(
      ids.map(async (id) => {
        const url = await callContract(medicalContract, MEDICAL_FACTORY_METHODS._products, [id]);
        const res = await axios.get(url);
        return { ...res.data, id };
      })
    );
  } catch (error) {
    throw error;
  }
};

export const getProductDetail = async (library, id) => {
  if (!library) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library);
    const url = await callContract(medicalContract, MEDICAL_FACTORY_METHODS._products, [id]);
    const res = await axios.get(url);
    return { ...res.data, id };
  } catch (error) {
    throw error;
  }
};
