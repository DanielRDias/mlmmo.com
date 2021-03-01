/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDeck = /* GraphQL */ `
  mutation CreateDeck(
    $input: CreateDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    createDeck(input: $input, condition: $condition) {
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
export const updateDeck = /* GraphQL */ `
  mutation UpdateDeck(
    $input: UpdateDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    updateDeck(input: $input, condition: $condition) {
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
export const deleteDeck = /* GraphQL */ `
  mutation DeleteDeck(
    $input: DeleteDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    deleteDeck(input: $input, condition: $condition) {
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
export const createCard = /* GraphQL */ `
  mutation CreateCard(
    $input: CreateCardInput!
    $condition: ModelCardConditionInput
  ) {
    createCard(input: $input, condition: $condition) {
      id
      owner
      ownerId
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
        owner
        ownerId
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
        owner
        ownerId
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
export const updateCard = /* GraphQL */ `
  mutation UpdateCard(
    $input: UpdateCardInput!
    $condition: ModelCardConditionInput
  ) {
    updateCard(input: $input, condition: $condition) {
      id
      owner
      ownerId
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
        owner
        ownerId
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
        owner
        ownerId
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
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard(
    $input: DeleteCardInput!
    $condition: ModelCardConditionInput
  ) {
    deleteCard(input: $input, condition: $condition) {
      id
      owner
      ownerId
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
        owner
        ownerId
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
        owner
        ownerId
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
export const createArtifact = /* GraphQL */ `
  mutation CreateArtifact(
    $input: CreateArtifactInput!
    $condition: ModelArtifactConditionInput
  ) {
    createArtifact(input: $input, condition: $condition) {
      id
      owner
      ownerId
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
        owner
        ownerId
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
        owner
        ownerId
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
export const updateArtifact = /* GraphQL */ `
  mutation UpdateArtifact(
    $input: UpdateArtifactInput!
    $condition: ModelArtifactConditionInput
  ) {
    updateArtifact(input: $input, condition: $condition) {
      id
      owner
      ownerId
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
        owner
        ownerId
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
        owner
        ownerId
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
export const deleteArtifact = /* GraphQL */ `
  mutation DeleteArtifact(
    $input: DeleteArtifactInput!
    $condition: ModelArtifactConditionInput
  ) {
    deleteArtifact(input: $input, condition: $condition) {
      id
      owner
      ownerId
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
        owner
        ownerId
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
        owner
        ownerId
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
