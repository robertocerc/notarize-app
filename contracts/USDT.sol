// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20("Tether USD", "USDT") {
    constructor() {
        mint();
    }

    function mint() public {
        _mint(msg.sender, 10 * 10 ** decimals());
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
