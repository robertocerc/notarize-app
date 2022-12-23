// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./INotarize.sol";

contract Notarize is Ownable, ReentrancyGuard, INotarize {
    uint subscriptionPrice;
    uint subscriptionPeriod;
    address tokenPaymentAddress;

    struct Doc {
        bytes docHash;
        uint timeNotarized;
        address creator;
    }

    mapping(address => Doc[]) notarizedDocs;
    mapping(address => uint) userSubscriptionDeadline;

    constructor(address tokenAddress) {
        tokenPaymentAddress = tokenAddress;
        setSubscriptionPrice(3);
        setSubscriptionPeriod(5);
    }

    function notarizeDoc(bytes memory ipfsHashOfDoc) public nonReentrant {
        require(
            userSubscriptionDeadline[msg.sender] > block.timestamp,
            "Subscription invalid or Expired"
        );
        Doc memory newDoc = Doc(ipfsHashOfDoc, block.timestamp, msg.sender);
        notarizedDocs[msg.sender].push(newDoc);
        emit NotarizeDoc(ipfsHashOfDoc, block.timestamp, msg.sender);
    }

    function setSubscriptionPrice(uint newPrice) public onlyOwner {
        subscriptionPrice = newPrice * 1000000;
    }

    function setSubscriptionPeriod(uint newPeriod) public onlyOwner {
        subscriptionPeriod = newPeriod * 86400;
    }

    function subscribe(uint noOfSubscriptionCycles) public nonReentrant {
        require(
            block.timestamp > userSubscriptionDeadline[msg.sender],
            "Subscription not expired yet"
        );
        require(noOfSubscriptionCycles > 0, "Cycles must be more than 0");
        require(
            IERC20(tokenPaymentAddress).transferFrom(
                msg.sender,
                address(this),
                (noOfSubscriptionCycles * subscriptionPrice)
            ) == true,
            "Could not transfer token"
        );
        userSubscriptionDeadline[msg.sender] =
            block.timestamp +
            (noOfSubscriptionCycles * subscriptionPeriod);
        emit Subscription(
            block.timestamp,
            noOfSubscriptionCycles,
            msg.sender,
            userSubscriptionDeadline[msg.sender]
        );
    }

    function getNotarizedDocs(
        address docCreator
    ) public view returns (Doc[] memory userDocs) {
        require(
            notarizedDocs[msg.sender].length > 0 || msg.sender == owner(),
            "You have not notarized any document yet"
        );
        if (msg.sender == owner()) {
            return notarizedDocs[docCreator];
        } else {
            return notarizedDocs[msg.sender];
        }
    }

    function getSubscriptionPrice() public view returns (uint) {
        return subscriptionPrice;
    }

    function getSubscriptionPeriod() public view returns (uint) {
        return subscriptionPeriod;
    }

    function getTokenPaymentAddress() public view returns (address) {
        return tokenPaymentAddress;
    }

    function getUserSubscriptionDeadline(
        address user
    ) public view returns (uint) {
        if (msg.sender == owner()) {
            return userSubscriptionDeadline[user];
        } else {
            return userSubscriptionDeadline[msg.sender];
        }
    }

    function withdraw() external onlyOwner {
        uint contractBal = IERC20(tokenPaymentAddress).balanceOf(address(this));
        IERC20(tokenPaymentAddress).transfer(owner(), contractBal);
        emit Withdrawal(contractBal, block.timestamp);
    }
}
