/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDeck = /* GraphQL */ `
  query GetDeck($id: ID!) {
    getDeck(id: $id) {
      id
      owner
      ownerId
      name
      createdAt
      updatedAt
      cards {
        id
        name
        createdAt
        updatedAt
        imgUrl
        cost
        cmc
        color
        type
        points
        description
        version
      }
    }
  }
`;
export const listDecks = /* GraphQL */ `
  query ListDecks(
    $filter: ModelDeckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDecks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        ownerId
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
      id
      name
      createdAt
      updatedAt
      imgUrl
      imgFullSize {
        region
        bucket
        key
      }
      imgThumbnail {
        region
        bucket
        key
      }
      cost
      cmc
      color
      type
      points
      properties {
        rank
        damage
        health
        dps
        role
        duration
        range
        area
      }
      description
      version
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        imgUrl
        cost
        cmc
        color
        type
        points
        description
        version
      }
      nextToken
    }
  }
`;
