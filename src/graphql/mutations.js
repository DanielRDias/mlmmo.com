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
      updatedBy
      updatedById
      createdAt
      updatedAt
      version
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
      updatedBy
      updatedById
      createdAt
      updatedAt
      version
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
      updatedBy
      updatedById
      createdAt
      updatedAt
      version
    }
  }
`;
export const createCardVersion = /* GraphQL */ `
  mutation CreateCardVersion(
    $input: CreateCardVersionInput!
    $condition: ModelCardVersionConditionInput
  ) {
    createCardVersion(input: $input, condition: $condition) {
      id
      newVersions {
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
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      oldVersions {
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
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCardVersion = /* GraphQL */ `
  mutation UpdateCardVersion(
    $input: UpdateCardVersionInput!
    $condition: ModelCardVersionConditionInput
  ) {
    updateCardVersion(input: $input, condition: $condition) {
      id
      newVersions {
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
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      oldVersions {
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
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCardVersion = /* GraphQL */ `
  mutation DeleteCardVersion(
    $input: DeleteCardVersionInput!
    $condition: ModelCardVersionConditionInput
  ) {
    deleteCardVersion(input: $input, condition: $condition) {
      id
      newVersions {
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
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      oldVersions {
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
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      createdAt
      updatedAt
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
    }
  }
`;
export const createArtifactVersion = /* GraphQL */ `
  mutation CreateArtifactVersion(
    $input: CreateArtifactVersionInput!
    $condition: ModelArtifactVersionConditionInput
  ) {
    createArtifactVersion(input: $input, condition: $condition) {
      id
      newVersions {
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
      oldVersions {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateArtifactVersion = /* GraphQL */ `
  mutation UpdateArtifactVersion(
    $input: UpdateArtifactVersionInput!
    $condition: ModelArtifactVersionConditionInput
  ) {
    updateArtifactVersion(input: $input, condition: $condition) {
      id
      newVersions {
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
      oldVersions {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteArtifactVersion = /* GraphQL */ `
  mutation DeleteArtifactVersion(
    $input: DeleteArtifactVersionInput!
    $condition: ModelArtifactVersionConditionInput
  ) {
    deleteArtifactVersion(input: $input, condition: $condition) {
      id
      newVersions {
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
      oldVersions {
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
      createdAt
      updatedAt
    }
  }
`;
