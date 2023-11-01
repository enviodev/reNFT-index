# Envio reNFT example

This repo contains an example indexer built using Envio for the [reNFT contract](https://polygonscan.com/address/0x4e52B73Aa28b7FF84d88eA3A90C0668f46043450) deployed on Poylgon.

All of the events from the reNFT contract are indexed as entities and the `EventsSummary` entity is defined to track number of each event that the indexer has indexed.

The indexer has been built using v0.0.21 of Envio.

## Steps to run the indexer

1. Clone the repo
1. Install any other pre-requisite packages for Envio listed [here](https://docs.envio.dev/docs/installation#prerequisites)
1. Install Envio via `npm i -g envio@v0.0.21`
1. Generate indexing code via `envio codegen`
1. Run the indexer via `envio dev` (make sure you have Docker running)
1. Stop the indexer via `envio start`

_Please refer to the [documentation website](https://docs.envio.dev) for a thorough guide on all Envio indexer features_
