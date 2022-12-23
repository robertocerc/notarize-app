// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface INotarize {
    event NotarizeDoc(bytes, uint, address);
    event Subscription(uint, uint, address, uint);
    event Withdrawal(uint, uint);
}
