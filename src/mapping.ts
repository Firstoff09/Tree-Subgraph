import { BigInt } from "@graphprotocol/graph-ts"
import {
  TREE,
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/TREE/TREE"
import { Approval_, OwnershipTransferred_, Transfer_ } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let entity = Approval_.load(event.params.value.toHex())

  if (entity == null) {
    entity = new Approval_(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let entity = OwnershipTransferred_.load(event.params.previousOwner.toHex())

  if (entity == null) {
    entity = new OwnershipTransferred_(event.params.previousOwner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleTransfer(event: Transfer): void {
  let entity = Transfer_.load(event.params.value.toHex())

  if (entity == null) {
    entity = new Transfer_(event.params.value.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}
