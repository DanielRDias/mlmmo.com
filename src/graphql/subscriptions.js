/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDeck = /* GraphQL */ `
  subscription OnCreateDeck($owner: String) {
    onCreateDeck(owner: $owner) {
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
export const onUpdateDeck = /* GraphQL */ `
  subscription OnUpdateDeck($owner: String) {
    onUpdateDeck(owner: $owner) {
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
export const onDeleteDeck = /* GraphQL */ `
  subscription OnDeleteDeck($owner: String) {
    onDeleteDeck(owner: $owner) {
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
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard {
    onCreateCard {
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
      power
      rarity
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
      oldVersion {
        id
        name
        imgUrl
        cost
        cmc
        color
        type
        points
        power
        rarity
        description
        r10damage
        r10health
        r10dps
        r10role
        r10duration
        r10range
        r10area
        decks
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      newVersion {
        id
        name
        imgUrl
        cost
        cmc
        color
        type
        points
        power
        rarity
        description
        r10damage
        r10health
        r10dps
        r10role
        r10duration
        r10range
        r10area
        decks
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard {
    onUpdateCard {
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
      power
      rarity
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
      oldVersion {
        id
        name
        imgUrl
        cost
        cmc
        color
        type
        points
        power
        rarity
        description
        r10damage
        r10health
        r10dps
        r10role
        r10duration
        r10range
        r10area
        decks
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      newVersion {
        id
        name
        imgUrl
        cost
        cmc
        color
        type
        points
        power
        rarity
        description
        r10damage
        r10health
        r10dps
        r10role
        r10duration
        r10range
        r10area
        decks
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard {
    onDeleteCard {
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
      power
      rarity
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
      oldVersion {
        id
        name
        imgUrl
        cost
        cmc
        color
        type
        points
        power
        rarity
        description
        r10damage
        r10health
        r10dps
        r10role
        r10duration
        r10range
        r10area
        decks
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      newVersion {
        id
        name
        imgUrl
        cost
        cmc
        color
        type
        points
        power
        rarity
        description
        r10damage
        r10health
        r10dps
        r10role
        r10duration
        r10range
        r10area
        decks
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
    }
  }
`;
export const onCreateArtifact = /* GraphQL */ `
  subscription OnCreateArtifact {
    onCreateArtifact {
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
      rarity
      description
      bonusR10
      bonusR20
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
      oldVersion {
        id
        name
        imgUrl
        rarity
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      newVersion {
        id
        name
        imgUrl
        rarity
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
    }
  }
`;
export const onUpdateArtifact = /* GraphQL */ `
  subscription OnUpdateArtifact {
    onUpdateArtifact {
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
      rarity
      description
      bonusR10
      bonusR20
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
      oldVersion {
        id
        name
        imgUrl
        rarity
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      newVersion {
        id
        name
        imgUrl
        rarity
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
    }
  }
`;
export const onDeleteArtifact = /* GraphQL */ `
  subscription OnDeleteArtifact {
    onDeleteArtifact {
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
      rarity
      description
      bonusR10
      bonusR20
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
      oldVersion {
        id
        name
        imgUrl
        rarity
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      newVersion {
        id
        name
        imgUrl
        rarity
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
    }
  }
`;
