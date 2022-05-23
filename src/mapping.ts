import { ERC20 } from "./../generated/TokensTracker/ERC20";
import { Token } from "./../generated/schema";
import { AddAddress } from "./../generated/TokensTracker/TokensTracker";
import { BigInt, log } from "@graphprotocol/graph-ts";
import { Transfer, Transfer__Params } from "../generated/Aave/AaveToken";
import { NewGravatar, UpdatedGravatar } from "../generated/Gravity/Gravity";
import { Transaction } from "../generated/schema";
import { AaveToken as TokenClass } from "../generated/templates/Token/AaveToken";

// export function handleNewGravatar(event: NewGravatar): void {
//   let gravatar = new Gravatar(event.params.id.toHex());
//   gravatar.owner = event.params.owner;
//   gravatar.displayName = event.params.displayName;
//   gravatar.imageUrl = event.params.imageUrl;
//   gravatar.save();
// }

// export function handleUpdatedGravatar(event: UpdatedGravatar): void {
//   let id = event.params.id.toHex();
//   let gravatar = Gravatar.load(id);
//   if (gravatar == null) {
//     gravatar = new Gravatar(id);
//   }
//   gravatar.owner = event.params.owner;
//   gravatar.displayName = event.params.displayName;
//   gravatar.imageUrl = event.params.imageUrl;
//   gravatar.save();
// }
// export function handleTransferGravatar(event: Transfer): void {
//   log.info("event id : {}", [event.transaction.hash.toHex()]);

//   const transfer = new Transaction(event.transaction.hash.toHex());
//   transfer.from = event.params.from.toHex();
//   transfer.to = event.params.to.toHex();
//   transfer.save();
// }

export function handleAddToken(event: AddAddress): void {
  if (Token.load(event.params._tokenAddress.toHex())) {
    return;
  }
  const newToken = new Token(event.params._tokenAddress.toHex());
  newToken.address = event.params._tokenAddress.toHex();
  const tokenContract = ERC20.bind(event.params._tokenAddress);
  const _totalSupply = tokenContract.totalSupply();
  // new TokenClass(event.params._tokenAddress.toHex());
  // TokenClass.bind(event.params._tokenAddress);
//  const token = new TokenClass(event.params._tokenAddress)
  newToken.totalSupply = _totalSupply;
  newToken.save();
}

export function handleTransfer(event: Transfer): void {
  log.info("event id : {}", [event.transaction.hash.toHex()]);
  const transfer = new Transaction(event.transaction.hash.toHex());
  transfer.from = event.params.from.toHex();
  transfer.to = event.params.to.toHex();
  transfer.amount = event.params.amount;
  transfer.address = event.address.toHex();
  transfer.hash = event.transaction.hash.toHex();
  transfer.blockNumber = event.block.number;
  transfer.timeStamp = event.block.timestamp.toString();

  transfer.save();
}
