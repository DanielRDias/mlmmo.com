/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDeck = /* GraphQL */ `
  subscription OnCreateDeck {
    onCreateDeck {
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
export const onUpdateDeck = /* GraphQL */ `
  subscription OnUpdateDeck {
    onUpdateDeck {
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
export const onDeleteDeck = /* GraphQL */ `
  subscription OnDeleteDeck {
    onDeleteDeck {
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
