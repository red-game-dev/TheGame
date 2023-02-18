import { gql } from "apollo-angular";

export const GET_WALLET = gql`
  query {
    currentUser {
      wallets {
        id
        amount
        currency
        name
      }
    }
  }
`;

export const GET_WALLET_SUBSCRIPTION = gql`
  subscription OnUpdateWallet {
    updateWallet {
      wallet {
        id
        amount
        currency
        name
      }
    }
  }
`
