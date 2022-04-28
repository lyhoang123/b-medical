import axios from 'axios';
import { MEDICAL_FACTORY_ADDRESS, MEDICAL_FACTORY_METHODS, ROLES, ROLES_WITH_USER_ADMIN } from 'configs';
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
        const [url, quantity] = await Promise.all([
          callContract(medicalContract, MEDICAL_FACTORY_METHODS._products, [id]),
          callContract(medicalContract, MEDICAL_FACTORY_METHODS.ownerQuantityProducts, [id]),
        ]);
        const res = await axios.get(url);
        return { ...res.data, id, quantity };
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
    const [url, quantity] = await Promise.all([
      callContract(medicalContract, MEDICAL_FACTORY_METHODS._products, [id]),
      callContract(medicalContract, MEDICAL_FACTORY_METHODS.ownerQuantityProducts, [id]),
    ]);
    const res = await axios.get(url);
    return { ...res.data, id, quantity };
  } catch (error) {
    throw error;
  }
};

export const buyMarketplace = async (library, account, id, quantity) => {
  if (!library || !account) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library, account);
    return callContract(medicalContract, MEDICAL_FACTORY_METHODS.buyMarketplace, [id, quantity]);
  } catch (error) {
    throw error;
  }
};

export const getHistories = async (library, account) => {
  if (!library || !account) throw Error('no signer or provider');
  try {
    const res = await axios.get(`http://localhost:5000/api/v1/transfers/${account}`);
    // console.log(histories);
    if (!res.data?.length) return [];
    return Promise.all(
      res.data.map(async (history) => {
        const product = await getProductDetail(library, history.id);
        return { ...history, product };
      })
    );
  } catch (error) {
    throw error;
  }
};

export const getPendingProviders = async (library) => {
  if (!library) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library);
    const addresses = await callContract(medicalContract, MEDICAL_FACTORY_METHODS.getPendingProviders, []);
    console.log(addresses);
    return Promise.all(
      addresses.map(async (addr) => {
        const url = await callContract(medicalContract, MEDICAL_FACTORY_METHODS.agentInfos, [addr]);
        console.log(url);
        const res = await axios.get(url);
        return { ...res.data, providerAddress: addr };
      })
    );
  } catch (error) {
    throw error;
  }
};

export const approveProvider = async (library, account, provider, idx, approve) => {
  if (!library || !account) throw Error('no signer or provider');
  try {
    const medicalContract = await getMedicalFactoryContract(library, account);
    return callContract(medicalContract, MEDICAL_FACTORY_METHODS.approveProvider, [provider, idx, approve]);
  } catch (error) {
    throw error;
  }
};

export const getOwnerRoles = async (library, account) => {
  if (!library || !account) throw Error('Invalid arguments');
  try {
    const medicalContract = await getMedicalFactoryContract(library);
    const roleValue = Object.values(ROLES);
    const [owner, censor, provider] = await Promise.all([
      callContract(medicalContract, MEDICAL_FACTORY_METHODS.owner, []),
      callContract(medicalContract, MEDICAL_FACTORY_METHODS.roles, [account, ROLES.CENSOR]),
      callContract(medicalContract, MEDICAL_FACTORY_METHODS.providerVerified, [account]),
    ]);
    let ownerRoles = [];
    if (owner === account) ownerRoles = [ROLES_WITH_USER_ADMIN.ADMIN];
    if (censor) ownerRoles = [ROLES_WITH_USER_ADMIN.CENSOR];
    if (provider) ownerRoles = [ROLES_WITH_USER_ADMIN.PROVIDER];
    return ownerRoles;
  } catch (error) {
    throw error;
  }
};
