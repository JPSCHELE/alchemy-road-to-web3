# SC Guideline docs

## Guideline (Contract Name)

### Overview <a href="#overview" id="overview"></a>

It's important to tell what the contract does, how it does that and what's expected to happen under different circumstances. Stuff that shouldn't happen are also welcome if you consider relevant. For example: "This contract should never have assets after any call". When necessary stuff like this can be added to a method or even a constructor.Internal contract stateEventsEvent1Descriptionevent ChamberTokenMinted(address indexed archChamber,address indexed recipient,uint256 quantity)ModifiersModifier 1Descriptionmodifier onlyWizard() virtualConstructorconstructor(address \_owner,string memory \_name,string memory \_symbol,address\[] memory \_constituents,uint256\[] memory \_quantities,address\[] memory \_wizards,address\[] memory \_managers) Owned(\_owner) ERC20(\_name, \_symbol, 18)Table with the parameters

### Functions <a href="#functions" id="functions"></a>

#### Reading functions <a href="#reading-functions" id="reading-functions"></a>

**1. getConstituentsQuantitiesForIssuance()**

function getConstituentsAddresses() external view returns (address\[] memory)Description of the main function. Who calls it, why and when.Inputs

| Args | Description |
| ---- | ----------- |
| ​    | ​           |
| ​    | ​           |
| ​    | ​           |

Outputs

| Args | Description |
| ---- | ----------- |
| ​    | ​           |
| ​    | ​           |
| ​    | ​           |

**Internal and external calls**

Show the diagram of interal/external calls. Show reentracy guard protection for external calls, if thats the case.

**Border cases**

**Case 1**How do we address the border case, why it will never happen, etc**Case 2**Idem

**Important Notes**

Something important to write aobut the implementation of this function, if any.

**2. getConstituentsQuantitiesForIssuance()**

#### Writing functions <a href="#writing-functions" id="writing-functions"></a>

Idem
