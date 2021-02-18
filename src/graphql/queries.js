/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDeck = /* GraphQL */ `
  query GetDeck($id: ID!) {
    getDeck(id: $id) {
      id
      owner
      ownerId
      name
      colors
      type
      cards
      vote {
        downVote
        upVote
        rating
        voteCount
      }
      createdAt
      updatedAt
      version
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
        colors
        type
        cards
        vote {
          downVote
          upVote
          rating
          voteCount
        }
        createdAt
        updatedAt
        version
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
        healing
        health
        dps
        role
        duration
        range
        area
      }
      description
      r10damage
      r10health
      r10dps
      r10role
      r10duration
      r10range
      r10area
      decks
      vote {
        downVote
        upVote
        rating
        voteCount
      }
      updatedBy
      updatedById
      createdAt
      updatedAt
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
          healing
          health
          dps
          role
          duration
          range
          area
        }
        description
        r10damage
        r10health
        r10dps
        r10role
        r10duration
        r10range
        r10area
        decks
        vote {
          downVote
          upVote
          rating
          voteCount
        }
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      nextToken
    }
  }
`;
