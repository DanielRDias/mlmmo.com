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
      toughness
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
      cardValues {
        key
        value
        type
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
      toughness
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
      cardValues {
        key
        value
        type
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
      toughness
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
      cardValues {
        key
        value
        type
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
        toughness
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
        toughness
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
        toughness
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
        toughness
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
        toughness
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
        toughness
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
      tier
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
      tier
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
      tier
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
        tier
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
        tier
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
        tier
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
        tier
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
        tier
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
        tier
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
export const createEquipment = /* GraphQL */ `
  mutation CreateEquipment(
    $input: CreateEquipmentInput!
    $condition: ModelEquipmentConditionInput
  ) {
    createEquipment(input: $input, condition: $condition) {
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
      imgTmogUrl
      imgTmogFullSize {
        region
        bucket
        key
      }
      imgTmogThumbnail {
        region
        bucket
        key
      }
      rarity
      slot
      description
      mods
      updatedBy
      updatedById
      createdAt
      updatedAt
      version
    }
  }
`;
export const updateEquipment = /* GraphQL */ `
  mutation UpdateEquipment(
    $input: UpdateEquipmentInput!
    $condition: ModelEquipmentConditionInput
  ) {
    updateEquipment(input: $input, condition: $condition) {
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
      imgTmogUrl
      imgTmogFullSize {
        region
        bucket
        key
      }
      imgTmogThumbnail {
        region
        bucket
        key
      }
      rarity
      slot
      description
      mods
      updatedBy
      updatedById
      createdAt
      updatedAt
      version
    }
  }
`;
export const deleteEquipment = /* GraphQL */ `
  mutation DeleteEquipment(
    $input: DeleteEquipmentInput!
    $condition: ModelEquipmentConditionInput
  ) {
    deleteEquipment(input: $input, condition: $condition) {
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
      imgTmogUrl
      imgTmogFullSize {
        region
        bucket
        key
      }
      imgTmogThumbnail {
        region
        bucket
        key
      }
      rarity
      slot
      description
      mods
      updatedBy
      updatedById
      createdAt
      updatedAt
      version
    }
  }
`;
export const createEquipmentVersion = /* GraphQL */ `
  mutation CreateEquipmentVersion(
    $input: CreateEquipmentVersionInput!
    $condition: ModelEquipmentVersionConditionInput
  ) {
    createEquipmentVersion(input: $input, condition: $condition) {
      id
      newVersions {
        id
        name
        imgUrl
        imgTmogUrl
        rarity
        slot
        description
        mods
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
        imgTmogUrl
        rarity
        slot
        description
        mods
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
export const updateEquipmentVersion = /* GraphQL */ `
  mutation UpdateEquipmentVersion(
    $input: UpdateEquipmentVersionInput!
    $condition: ModelEquipmentVersionConditionInput
  ) {
    updateEquipmentVersion(input: $input, condition: $condition) {
      id
      newVersions {
        id
        name
        imgUrl
        imgTmogUrl
        rarity
        slot
        description
        mods
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
        imgTmogUrl
        rarity
        slot
        description
        mods
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
export const deleteEquipmentVersion = /* GraphQL */ `
  mutation DeleteEquipmentVersion(
    $input: DeleteEquipmentVersionInput!
    $condition: ModelEquipmentVersionConditionInput
  ) {
    deleteEquipmentVersion(input: $input, condition: $condition) {
      id
      newVersions {
        id
        name
        imgUrl
        imgTmogUrl
        rarity
        slot
        description
        mods
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
        imgTmogUrl
        rarity
        slot
        description
        mods
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
export const createLoadout = /* GraphQL */ `
  mutation CreateLoadout(
    $input: CreateLoadoutInput!
    $condition: ModelLoadoutConditionInput
  ) {
    createLoadout(input: $input, condition: $condition) {
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
      youtubeUrl
      type
      shortDescription
      longDescription
      class
      deck
      equipments {
        id
        name
        imgUrl
        imgTmogUrl
        rarity
        slot
        description
        mods
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      artifacts {
        id
        name
        imgUrl
        rarity
        tier
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      traits
      createdAt
      updatedAt
      version
    }
  }
`;
export const updateLoadout = /* GraphQL */ `
  mutation UpdateLoadout(
    $input: UpdateLoadoutInput!
    $condition: ModelLoadoutConditionInput
  ) {
    updateLoadout(input: $input, condition: $condition) {
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
      youtubeUrl
      type
      shortDescription
      longDescription
      class
      deck
      equipments {
        id
        name
        imgUrl
        imgTmogUrl
        rarity
        slot
        description
        mods
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      artifacts {
        id
        name
        imgUrl
        rarity
        tier
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      traits
      createdAt
      updatedAt
      version
    }
  }
`;
export const deleteLoadout = /* GraphQL */ `
  mutation DeleteLoadout(
    $input: DeleteLoadoutInput!
    $condition: ModelLoadoutConditionInput
  ) {
    deleteLoadout(input: $input, condition: $condition) {
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
      youtubeUrl
      type
      shortDescription
      longDescription
      class
      deck
      equipments {
        id
        name
        imgUrl
        imgTmogUrl
        rarity
        slot
        description
        mods
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      artifacts {
        id
        name
        imgUrl
        rarity
        tier
        description
        bonusR10
        bonusR20
        updatedBy
        updatedById
        createdAt
        updatedAt
        version
      }
      traits
      createdAt
      updatedAt
      version
    }
  }
`;
