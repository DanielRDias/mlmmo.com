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
        description
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
export const getCardVersion = /* GraphQL */ `
  query GetCardVersion($id: ID!) {
    getCardVersion(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;
export const listCardVersions = /* GraphQL */ `
  query ListCardVersions(
    $filter: ModelCardVersionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCardVersions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getArtifact = /* GraphQL */ `
  query GetArtifact($id: ID!) {
    getArtifact(id: $id) {
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
export const listArtifacts = /* GraphQL */ `
  query ListArtifacts(
    $filter: ModelArtifactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArtifacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getArtifactVersion = /* GraphQL */ `
  query GetArtifactVersion($id: ID!) {
    getArtifactVersion(id: $id) {
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
export const listArtifactVersions = /* GraphQL */ `
  query ListArtifactVersions(
    $filter: ModelArtifactVersionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArtifactVersions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
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
      }
      nextToken
    }
  }
`;
export const getEquipment = /* GraphQL */ `
  query GetEquipment($id: ID!) {
    getEquipment(id: $id) {
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
export const listEquipments = /* GraphQL */ `
  query ListEquipments(
    $filter: ModelEquipmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEquipments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEquipmentVersion = /* GraphQL */ `
  query GetEquipmentVersion($id: ID!) {
    getEquipmentVersion(id: $id) {
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
export const listEquipmentVersions = /* GraphQL */ `
  query ListEquipmentVersions(
    $filter: ModelEquipmentVersionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEquipmentVersions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLoadout = /* GraphQL */ `
  query GetLoadout($id: ID!) {
    getLoadout(id: $id) {
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
export const listLoadouts = /* GraphQL */ `
  query ListLoadouts(
    $filter: ModelLoadoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoadouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        ownerId
        name
        imgUrl
        youtubeUrl
        type
        shortDescription
        class
        traits
        createdAt
        updatedAt
        version
      }
      nextToken
    }
  }
`;
