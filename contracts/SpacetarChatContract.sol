// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SpacetarChatContract is AccessControl {
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
    bytes32 public constant BLACKLISTED_ROLE = keccak256("BLACKLISTED_ROLE");

    event NewSpacetarChat(address indexed from, uint256 timestamp, string chatMessage, string groupName);
    event PointsEarned(address indexed user, uint256 points);
    event PointsClaimed(address indexed user, uint256 points);

    struct SpacetarChat {
        address user;
        string chatMessage;
        uint256 timestamp;
        string groupName;
    }

    struct UserInfo {
        address user;
        uint256 messagesSent;
        uint256 pointBalance;
    }


    SpacetarChat[] spacetarChats;
    mapping(address => uint256) public userPoints;
    mapping(address => uint256) public bannedUntil;

    IERC20 public token;

    modifier onlyCustomRole(bytes32 role) {
        require(hasRole(role, msg.sender), "Unauthorized");
        _;
    }

    constructor(address tokenAddress) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(DEPLOYER_ROLE, msg.sender);
        token = IERC20(tokenAddress);
    }
    function sendChatMessage(string memory _chatMessage, string memory _groupName) public {
        spacetarChats.push(SpacetarChat(msg.sender, _chatMessage, block.timestamp, _groupName));
        emit NewSpacetarChat(msg.sender, block.timestamp, _chatMessage, _groupName);

        userPoints[msg.sender] += 10;
        emit PointsEarned(msg.sender, 10);
    }

    function displayAllChatMessages() public view returns (SpacetarChat[] memory) {
        return spacetarChats;
    }

    function getMyChats() public view returns (SpacetarChat[] memory) {
        uint256 count;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (spacetarChats[i].user == msg.sender) {
                count++;
            }
        }
        SpacetarChat[] memory myChats = new SpacetarChat[](count);
        uint256 currentIndex;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (spacetarChats[i].user == msg.sender) {
                myChats[currentIndex] = spacetarChats[i];
                currentIndex++;
            }
        }
        return myChats;
    }

    function getOtherUserChats(address userAddress) public view returns (SpacetarChat[] memory) {
        uint256 count;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (spacetarChats[i].user == userAddress) {
                count++;
            }
        }
        SpacetarChat[] memory otherUserChats = new SpacetarChat[](count);
        uint256 currentIndex;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (spacetarChats[i].user == userAddress) {
                otherUserChats[currentIndex] = spacetarChats[i];
                currentIndex++;
            }
        }
        return otherUserChats;
    }

    function getPoints() public view returns (uint256) {
        return userPoints[msg.sender];
    }

    function getUsers(uint256 filterDays) public view onlyRole(DEPLOYER_ROLE) returns (UserInfo[] memory) {
        UserInfo[] memory usersInfo = new UserInfo[](spacetarChats.length);
        uint256 currentIndex;

        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (block.timestamp - spacetarChats[i].timestamp <= filterDays * 1 days) {
                address currentUser = spacetarChats[i].user;
                bool userExists = false;

                for (uint256 j = 0; j < currentIndex; j++) {
                    if (usersInfo[j].user == currentUser) {
                        usersInfo[j].messagesSent++;
                        userExists = true;
                        break;
                    }
                }

                if (!userExists) {
                    usersInfo[currentIndex] = UserInfo({
                        user: currentUser,
                        messagesSent: 1,
                        pointBalance: userPoints[currentUser]
                    });
                    currentIndex++;
                }
            }
        }

        UserInfo[] memory filteredUsers = new UserInfo[](currentIndex);
        for (uint256 i = 0; i < currentIndex; i++) {
            filteredUsers[i] = usersInfo[i];
        }

        return filteredUsers;
    }

    function blacklistUser(address userAddress) public onlyRole(DEPLOYER_ROLE) {
        grantRole(BLACKLISTED_ROLE, userAddress);
    }

    function unBlacklistUser(address userAddress) public onlyRole(DEPLOYER_ROLE) {
        revokeRole(BLACKLISTED_ROLE, userAddress);
    }

    function banUserFor1day(address userAddress) public onlyRole(DEPLOYER_ROLE) {
        bannedUntil[userAddress] = block.timestamp + 1 days;
    }

    function claimPoints(uint256 pointsToClaim) public {
        require(userPoints[msg.sender] >= 1000, "Insufficient points to claim");
        require(pointsToClaim <= userPoints[msg.sender], "Cannot claim more points than available");

        require(token.balanceOf(address(this)) >= pointsToClaim, "Insufficient contract balance");
        require(token.transfer(msg.sender, pointsToClaim), "Token transfer failed");

        userPoints[msg.sender] -= pointsToClaim;
        emit PointsClaimed(msg.sender, pointsToClaim);
    }

    function getGroupChats(string memory groupName) public view returns (SpacetarChat[] memory) {
        uint256 count;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (keccak256(bytes(spacetarChats[i].groupName)) == keccak256(bytes(groupName))) {
                count++;
            }
        }
        SpacetarChat[] memory groupChats = new SpacetarChat[](count);
        uint256 currentIndex;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (keccak256(bytes(spacetarChats[i].groupName)) == keccak256(bytes(groupName))) {
                groupChats[currentIndex] = spacetarChats[i];
                currentIndex++;
            }
        }
        return groupChats;
    }
}
