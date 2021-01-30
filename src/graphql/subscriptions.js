/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDeck = /* GraphQL */ `
  subscription OnCreateDeck($owner: String) {
    onCreateDeck(owner: $owner) {
      id
      owner
      ownerId
      name
      createdAt
      updatedAt
      cards
    }
  }
`;
export const onUpdateDeck = /* GraphQL */ `
  subscription OnUpdateDeck($owner: String) {
    onUpdateDeck(owner: $owner) {
      id
      owner
      ownerId
      name
      createdAt
      updatedAt
      cards
    }
  }
`;
export const onDeleteDeck = /* GraphQL */ `
  subscription OnDeleteDeck($owner: String) {
    onDeleteDeck(owner: $owner) {
      id
      owner
      ownerId
      name
      createdAt
      updatedAt
      cards
    }
  }
`;
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard {
    onCreateCard {
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
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard {
    onUpdateCard {
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard {
    onDeleteCard {
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
