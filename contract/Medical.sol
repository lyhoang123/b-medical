// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


library Counters {
    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

contract MedicalFactory is Ownable {
    // agents
    enum ROLE {
        CENSOR,
        PROVIDER,
        DISTRIBUTOR
    }
    mapping(address => mapping(ROLE => bool)) public roles;
    mapping(ROLE => address[]) public agents;
    mapping(address => string) public agentInfos;
    mapping(address => bool) public providerVerified;

    enum PRODUCT_STATUS {
        PENDING,
        APPROVED,
        REJECTED
    }

    // products
    string[] public infos;
    uint256 public id; // allways increase foeach new mint (from 0)
    uint256 public pid; // allways increase foeach enterProduct (from 0)
    // id => pid
    mapping(uint256 => uint256) public products;
    mapping(uint256 => string) public _products;
    // id => bool (is sold in marketplace)
    mapping(uint256 => bool) public isSoldMarketplace;
    // pid =>  string(metadata ipfs url)
    mapping(uint256 => string) public productInfos;
    // id => owner
    mapping(uint256 => address) public productOwners;
    // address => id[]
    mapping(address => uint256[]) public ownerProducts;
    // id => quantity of product
    mapping(uint256 => uint256) public ownerQuantityProducts;
    // id => status
    mapping(uint256 => PRODUCT_STATUS) public productStatuses;
    // id => uint(number approved)
    mapping(uint256 => uint) public approvedQuantity;
    // id => uint(number of rejected)
    mapping(uint256 => uint) public rejectedQuantity;
    // id => censor => bool
    mapping(uint256 => mapping(address => bool)) public decisionStatuses;

    constructor() {
        _addAgent(_msgSender(), ROLE.CENSOR, "");
        _addAgent(_msgSender(), ROLE.PROVIDER, "");
        providerVerified[_msgSender()] = true;
        agents[ROLE.PROVIDER].push(_msgSender());
    }

    // events
    event Transfer(uint256 id, uint256 pid, uint256 newId, address oldOwner, address newOwner, uint256 quantity, uint256 timestamp);

    modifier onlyCensor {
        require(roles[_msgSender()][ROLE.CENSOR], "ROLE: UNAUTHORIZED");
        _;
    }
    
    modifier onlyProvider(address provider) {
        require(roles[provider][ROLE.PROVIDER], "ROLE: UNAUTHORIZED");
        _;
    }

    modifier onlyProviderVerified {
        require(roles[_msgSender()][ROLE.PROVIDER], "ROLE: UNAUTHORIZED");
        require(providerVerified[_msgSender()], "ROLE: PROVIDER_NOT_VERIFIED");
        _;
    }

    modifier onlyDistributor {
        require(roles[_msgSender()][ROLE.DISTRIBUTOR], "ROLE: UNAUTHORIZED");
        _;
    }

     function _addAgent(address account, ROLE role, string memory url) private {
        roles[account][role] = true;
        agents[role].push(account);
        agentInfos[account] = url;
    }

    function addAgent(address account, ROLE role, string memory url) external onlyOwner {
        require(!roles[account][role], "AGENT: ALREADY_ADDED_WITH_ADDRESS");
        _addAgent(account, role, url);
    }

     function registerProvider(address provider, string memory url) external {
        ROLE role = ROLE.PROVIDER;
        require(!roles[provider][role], "AGENT: ALREADY_ADDED_WITH_ADDRESS");
        roles[provider][role] = true;
        agentInfos[provider] = url;
    }

    function approveProvider(address provider) external onlyOwner onlyProvider(_msgSender()) {
       providerVerified[provider] = true;
       agents[ROLE.PROVIDER].push(provider);
    }

    function getAgents(ROLE role) external view returns(address[] memory) {
        return agents[role];
    }

    function hasRoles(ROLE[] memory _roles) private view {
        bool check = true;
        for(uint8 i = 0; i < _roles.length; i++) {
            if(!roles[_msgSender()][_roles[i]]) {
                check = false;
                break;
            }
        }
        require(check, "ROLE: UNAUTHORIZED");
    }

    // register product
    function enterProduct(string memory info, uint256 quantity) external onlyProviderVerified {
        products[id] = pid;
        _products[id] = info;
        productInfos[pid] = info;
        infos.push(info);
        productOwners[id] = _msgSender();
        ownerProducts[_msgSender()].push(id);
        ownerQuantityProducts[id] = quantity;
        id++;
        pid++;
    }

    // approve product
    function approveOrRejectProduct(uint256 _id, bool approve) external onlyCensor {
        require(productStatuses[_id] == PRODUCT_STATUS.PENDING, "PRODUCT: APPROVED_PRODUCT");
        require(!decisionStatuses[_id][_msgSender()], "CENSOR: DECIDED");
        decisionStatuses[_id][_msgSender()] = true;
        if(approve) {
            approvedQuantity[_id]++;
            if(approvedQuantity[_id] > agents[ROLE.CENSOR].length/2) {
                productStatuses[_id] = PRODUCT_STATUS.APPROVED;
                isSoldMarketplace[_id] = true;
                emit Transfer(0, products[_id], _id, address(0), productOwners[_id], ownerQuantityProducts[id], block.timestamp);
            }
        } else {
            rejectedQuantity[_id]++;
            if(rejectedQuantity[_id] > agents[ROLE.CENSOR].length/2) {
                productStatuses[_id] = PRODUCT_STATUS.REJECTED;
            }
        }
    }

        // get all products is pending to review
    function getProductsPending() external view returns(uint256[] memory) {
        uint256 count = 0;
        for(uint256 i=0; i<id; i++) {
            if(!isSoldMarketplace[i] && productStatuses[i] == PRODUCT_STATUS.PENDING) {
                // ids[count] = i;
                count++;
            }
        }
        if(count == 0) return new uint256[](0);
        uint256[] memory ids = new uint256[](count);
        uint256 k = 0;
        for(uint256 i=0; i<id; i++) {
            if(!isSoldMarketplace[i] && productStatuses[i] == PRODUCT_STATUS.PENDING) {
                ids[k] = i;
                k++;
            }
        }
        return ids;
    }
    
    // get all products is sold in marketplace
    function getProductsSoldMarketplace() external view returns(uint256[] memory) {
        uint256 count = 0;
        for(uint256 i=0; i<id; i++) {
            if(isSoldMarketplace[i] && productStatuses[i] == PRODUCT_STATUS.APPROVED) {
                // ids[count] = i;
                count++;
            }
        }
        if(count == 0) return new uint256[](0);
        uint256[] memory ids = new uint256[](count);
        uint256 k = 0;
        for(uint256 i=0; i<id; i++) {
            if(isSoldMarketplace[i] && productStatuses[i] == PRODUCT_STATUS.APPROVED) {
                ids[k] = i;
                k++;
            }
        }
        return ids;
    }

    // buy product from marketplace
    function buyMarketplace(uint256 _id, uint256 _quantity) external {
        require(isSoldMarketplace[_id], "PRODUCT: NOT_SOLD");
        require(ownerQuantityProducts[_id] < _quantity, "PRODUCT: NOT_ENOUGH_QUANTITY");
        products[id] = products[_id];
        // productInfos[pid] = info;
        productOwners[id] = _msgSender();
        ownerProducts[_msgSender()].push(id);
        ownerQuantityProducts[id] += _quantity;
        ownerQuantityProducts[_id] -= _quantity;
        emit Transfer(_id, products[_id], id, productOwners[_id], _msgSender(), ownerQuantityProducts[id], block.timestamp);
        id++;
        pid++;
        if(ownerQuantityProducts[_id] == 0) {
            isSoldMarketplace[_id] = false;
        }
    }
    
    // re-sell in marketplace by distributor
    function sellMarketplace(uint _id) external onlyDistributor {
        require(!isSoldMarketplace[_id], "PRODUCT: SOLD");
        isSoldMarketplace[_id] = true;
    }
}