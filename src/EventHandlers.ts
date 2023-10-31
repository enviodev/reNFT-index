/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  RegistryContract_Lend_loader,
  RegistryContract_Lend_handler,
  RegistryContract_Rent_loader,
  RegistryContract_Rent_handler,
  RegistryContract_RentClaimed_loader,
  RegistryContract_RentClaimed_handler,
  RegistryContract_StopLend_loader,
  RegistryContract_StopLend_handler,
  RegistryContract_StopRent_loader,
  RegistryContract_StopRent_handler,
} from "../generated/src/Handlers.gen";

import {
  LendEntity,
  RentEntity,
  RentClaimedEntity,
  StopLendEntity,
  StopRentEntity,
  EventsSummaryEntity
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  lendsCount: BigInt(0),
  rentsCount: BigInt(0),
  rentClaimedsCount: BigInt(0),
  stopLendsCount: BigInt(0),
  stopRentsCount: BigInt(0),
};

RegistryContract_Lend_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_Lend_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    lendsCount: currentSummaryEntity.lendsCount + BigInt(1),
  };

  let lendEntity: LendEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    is721: event.params.is721,
    lenderAddress: event.params.lenderAddress,
    nftAddress: event.params.nftAddress,
    tokenID: event.params.tokenID,
    lendingID: event.params.lendingID,
    maxRentDuration: event.params.maxRentDuration,
    dailyRentPrice: event.params.dailyRentPrice,
    lendAmount: event.params.lendAmount,
    paymentToken: event.params.paymentToken,
    willAutoRenew: event.params.willAutoRenew,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Lend.set(lendEntity);
});

RegistryContract_Rent_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_Rent_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    rentsCount: currentSummaryEntity.rentsCount + BigInt(1),
  };

  let rentEntity: RentEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    renterAddress: event.params.renterAddress,
    lendingID: event.params.lendingID,
    rentingID: event.params.rentingID,
    rentAmount: event.params.rentAmount,
    rentDuration: event.params.rentDuration,
    rentedAt: event.params.rentedAt,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Rent.set(rentEntity);
});

RegistryContract_RentClaimed_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_RentClaimed_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    rentClaimedsCount: currentSummaryEntity.rentClaimedsCount + BigInt(1),
  };

  let rentClaimedEntity: RentClaimedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    rentingID: event.params.rentingID,
    collectedAt: event.params.collectedAt,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.RentClaimed.set(rentClaimedEntity);
});

RegistryContract_StopLend_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_StopLend_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    stopLendsCount: currentSummaryEntity.stopLendsCount + BigInt(1),
  };

  let stopLendEntity: StopLendEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    lendingID: event.params.lendingID,
    stoppedAt: event.params.stoppedAt,
    amount: event.params.amount,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.StopLend.set(stopLendEntity);
});

RegistryContract_StopRent_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

RegistryContract_StopRent_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    stopRentsCount: currentSummaryEntity.stopRentsCount + BigInt(1),
  };

  let stopRentEntity: StopRentEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    rentingID: event.params.rentingID,
    stoppedAt: event.params.stoppedAt,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.StopRent.set(stopRentEntity);
});

