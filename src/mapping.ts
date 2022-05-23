import { log } from "@graphprotocol/graph-ts";
import { Transfer, Transfer__Params } from "../generated/Aave/AaveToken";
import { NewGravatar, UpdatedGravatar } from "../generated/Gravity/Gravity";
import { Transaction } from "../generated/schema";

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
export function handleTransferGravatar(event: Transfer): void {
         log.info("event id : {}", [event.transaction.hash.toHex()]);

         const transfer = new Transaction(event.transaction.hash.toHex());
         transfer.from = event.params.from.toHex();
         transfer.to = event.params.to.toHex();
         transfer.save();
       }
