import { gql } from "@apollo/client";

const MUTATION_REGISTER = gql`
  mutation Mutation($register: CreateUserInput!) {
    register(register: $register) {
      access_token
      refresh_token
      user {
        username
        id
      }
    }
  }
`;
const MUTATION_LOGIN = gql`
  mutation Login($login: LoginAuthInput!) {
    login(login: $login) {
      access_token
      refresh_token
      user {
        id
        username
      }
    }
  }
`;

export { MUTATION_REGISTER, MUTATION_LOGIN };
