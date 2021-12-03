# Using a merkle root with the drop module

This example:

1. Loads addresses from a CSV
2. Generates a merkle tree for the list of addresses and spits out the root
3. Demonstrates how to check if a given address is valid and contained in the merkle tree
4. Deploys a drop module with the merkle root condition

The intention of this example is to show how the underlying merkle root generation process works.

The Thirdweb sdk is intended to handle most of this logic for the caller, but that functionality
is not yet in the typescript sdk but will be very soon.
