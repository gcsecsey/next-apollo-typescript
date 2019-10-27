import gql from "graphql-tag";

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($id: ID!, $votes: Int) {
    updatePost(id: $id, votes: $votes) {
      __typename
      id
      votes
    }
  }
`