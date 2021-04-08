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
export const onCreateCardVersion = /* GraphQL */ `
  subscription OnCreateCardVersion {
    onCreateCardVersion {
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
export const onUpdateCardVersion = /* GraphQL */ `
  subscription OnUpdateCardVersion {
    onUpdateCardVersion {
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
export const onDeleteCardVersion = /* GraphQL */ `
  subscription OnDeleteCardVersion {
    onDeleteCardVersion {
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
export const onCreateArtifactVersion = /* GraphQL */ `
  subscription OnCreateArtifactVersion {
    onCreateArtifactVersion {
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
export const onUpdateArtifactVersion = /* GraphQL */ `
  subscription OnUpdateArtifactVersion {
    onUpdateArtifactVersion {
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
export const onDeleteArtifactVersion = /* GraphQL */ `
  subscription OnDeleteArtifactVersion {
    onDeleteArtifactVersion {
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
export const onCreateEquipment = /* GraphQL */ `
  subscription OnCreateEquipment {
    onCreateEquipment {
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
export const onUpdateEquipment = /* GraphQL */ `
  subscription OnUpdateEquipment {
    onUpdateEquipment {
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
export const onDeleteEquipment = /* GraphQL */ `
  subscription OnDeleteEquipment {
    onDeleteEquipment {
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
export const onCreateEquipmentVersion = /* GraphQL */ `
  subscription OnCreateEquipmentVersion {
    onCreateEquipmentVersion {
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
export const onUpdateEquipmentVersion = /* GraphQL */ `
  subscription OnUpdateEquipmentVersion {
    onUpdateEquipmentVersion {
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
export const onDeleteEquipmentVersion = /* GraphQL */ `
  subscription OnDeleteEquipmentVersion {
    onDeleteEquipmentVersion {
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
export const onCreateLoadout = /* GraphQL */ `
  subscription OnCreateLoadout($owner: String) {
    onCreateLoadout(owner: $owner) {
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
      createdAt
      updatedAt
      version
    }
  }
`;
export const onUpdateLoadout = /* GraphQL */ `
  subscription OnUpdateLoadout($owner: String) {
    onUpdateLoadout(owner: $owner) {
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
      createdAt
      updatedAt
      version
    }
  }
`;
export const onDeleteLoadout = /* GraphQL */ `
  subscription OnDeleteLoadout($owner: String) {
    onDeleteLoadout(owner: $owner) {
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
      createdAt
      updatedAt
      version
    }
  }
`;
