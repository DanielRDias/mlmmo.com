import { API, graphqlOperation } from "aws-amplify";

import { getDeck as getDeckQuery } from "@/graphql/queries";
import { listDecks as listDecksQuery } from "@/graphql/queries";
import { createDeck as createDeckMutation } from "@/graphql/mutations";
import { deleteDeck as deleteDeckMutation } from "@/graphql/mutations";

import { getCard as getCardQuery } from "@/graphql/queries";
import { listCards as listCardsQuery } from "@/graphql/queries";
import { createCard as createCardMutation } from "@/graphql/mutations";
import { updateCard as updateCardMutation } from "@/graphql/mutations";
import { createCardVersion as createVersionsCardMutation } from "@/graphql/mutations";
import { updateCardVersion as updateVersionsCardMutation } from "@/graphql/mutations";
import { getCardVersion as getCardVersionQuery } from "@/graphql/queries";
import { listCardVersions as listCardVersionsQuery } from "@/graphql/queries";

import { getArtifact as getArtifactQuery } from "@/graphql/queries";
import { listArtifacts as listArtifactsQuery } from "@/graphql/queries";
import { createArtifact as createArtifactMutation } from "@/graphql/mutations";
import { updateArtifact as updateArtifactMutation } from "@/graphql/mutations";
import { createArtifactVersion as createVersionsArtifactMutation } from "@/graphql/mutations";
import { updateArtifactVersion as updateVersionsArtifactMutation } from "@/graphql/mutations";
import { getArtifactVersion as getArtifactVersionQuery } from "@/graphql/queries";
import { listArtifactVersions as listArtifactVersionsQuery } from "@/graphql/queries";

import { getEquipment as getEquipmentQuery } from "@/graphql/queries";
import { listEquipments as listEquipmentsQuery } from "@/graphql/queries";
import { createEquipment as createEquipmentMutation } from "@/graphql/mutations";
import { updateEquipment as updateEquipmentMutation } from "@/graphql/mutations";
import { createEquipmentVersion as createVersionsEquipmentMutation } from "@/graphql/mutations";
import { updateEquipmentVersion as updateVersionsEquipmentMutation } from "@/graphql/mutations";
import { getEquipmentVersion as getEquipmentVersionQuery } from "@/graphql/queries";
import { listEquipmentVersions as listEquipmentVersionsQuery } from "@/graphql/queries";

import { getLoadout as getLoadoutQuery } from "@/graphql/queries";
import { listLoadouts as listLoadoutsQuery } from "@/graphql/queries";
import { createLoadout as createLoadoutMutation } from "@/graphql/mutations";
import { updateLoadout as updateLoadoutMutation } from "@/graphql/mutations";

import { v4 as uuid } from "uuid";
import awsconfig from "@/aws-exports";

export const cardInfo = {
  namespaced: true,
  state: {
    decks: null,
    cards: null,
    cardVersions: null,
    artifacts: null,
    artifactVersions: null,
    equipments: null,
    equipmentVersions: null,
    newDeck: null,
    newDeckCards: [],
    loadouts: null,
  },

  getters: {
    cards: (state) => state.cards,
    cardVersions: (state) => state.cardVersions,
    decks: (state) => state.decks,
    artifacts: (state) => state.artifacts,
    artifactVersions: (state) => state.artifactVersions,
    equipments: (state) => state.equipments,
    equipmentVersions: (state) => state.equipmentVersions,
    newDeck: (state) => state.newDeck,
    newDeckCards: (state) => state.newDeckCards,
    loadouts: (state) => state.loadouts,
  },

  mutations: {
    setNewDeck(state, payload) {
      state.newDeck = payload;
    },
    removeCardFromDeck(state, payload) {
      var index = state.newDeckCards.indexOf(payload.cardId);
      if (index !== -1) {
        state.newDeckCards.splice(index, 1);
      }
    },
    addCardToDeck(state, payload) {
      state.newDeckCards.push(payload.cardId);
      state.newDeckCards = [...new Set(state.newDeckCards)];
    },
    setDecks(state, payload) {
      state.decks = payload;
    },
    appendDecks(state, payload) {
      state.decks = state.decks.concat(payload);
    },
    setCards(state, payload) {
      state.cards = payload;
    },
    appendCards(state, payload) {
      state.cards = state.cards.concat(payload);
    },
    setCardVersions(state, payload) {
      state.cardVersions = payload;
    },
    appendCardVersions(state, payload) {
      state.cardVersions = state.cardVersions.concat(payload);
    },
    setArtifacts(state, payload) {
      state.artifacts = payload;
    },
    appendArtifacts(state, payload) {
      state.artifacts = state.artifacts.concat(payload);
    },
    setArtifactVersions(state, payload) {
      state.artifactVersions = payload;
    },
    appendArtifactVersions(state, payload) {
      state.artifactVersions = state.artifactVersions.concat(payload);
    },

    setEquipments(state, payload) {
      state.equipments = payload;
    },
    appendEquipments(state, payload) {
      state.equipments = state.equipments.concat(payload);
    },
    setEquipmentVersions(state, payload) {
      state.equipmentVersions = payload;
    },
    appendEquipmentVersions(state, payload) {
      state.equipmentVersions = state.equipmentVersions.concat(payload);
    },
  },
  actions: {
    /**
     * Decks
     */
    async createDeck(_, data) {
      try {
        await API.graphql(
          graphqlOperation(createDeckMutation, { input: data })
        );
      } catch (error) {
        console.error("create deck", error);
      }
    },
    async deleteDeck(_, deckId) {
      try {
        await API.graphql(
          graphqlOperation(deleteDeckMutation, { input: { id: deckId } })
        );
      } catch (error) {
        console.error("delete deck", error);
        return Promise.reject(error);
      }
    },
    async createAnonymousDeck(_, data) {
      try {
        await API.graphql({
          query: createDeckMutation,
          variables: { input: data },
          authMode: "API_KEY",
        });
      } catch (error) {
        console.error("createdeck", error);
      }
    },
    async getDeck(_, deckId) {
      return await API.graphql({
        query: getDeckQuery,
        variables: { id: deckId },
        authMode: "API_KEY",
      });
    },
    async getDecksData({ commit }) {
      const decksData = await API.graphql({
        query: listDecksQuery,
        authMode: "API_KEY",
      });
      commit("setDecks", decksData.data.listDecks.items);
    },
    async getUserDecksData({ commit }) {
      const decksData = await API.graphql(graphqlOperation(listDecksQuery));
      commit("setDecks", decksData.data.listDecks.items);
    },

    /**
     * Cards
     */
    async getCard(_, cardId) {
      return await API.graphql({
        query: getCardQuery,
        variables: { id: cardId },
        authMode: "API_KEY",
      });
    },

    async updateCard(_, data) {
      let { file, cardData } = data;

      const currentCard = await API.graphql({
        query: getCardQuery,
        variables: { id: cardData.id },
        authMode: "API_KEY",
      });

      let currentCardVersion = await API.graphql({
        query: getCardVersionQuery,
        variables: { id: cardData.id },
      });

      if (currentCardVersion.data.getCardVersion == null) {
        //insert
        try {
          await API.graphql(
            graphqlOperation(createVersionsCardMutation, {
              input: {
                id: cardData.id,
                newVersions: [],
                oldVersions: [currentCard.data.getCard],
              },
            })
          );
        } catch (error) {
          console.log("createVersionsCardMutation error", error);
          return Promise.reject(error);
        }
      } else {
        //update
        if (Array.isArray(currentCardVersion.data.getCardVersion.oldVersions)) {
          currentCardVersion.data.getCardVersion.oldVersions.push(
            currentCard.data.getCard
          );
        } else {
          currentCardVersion.data.getCardVersion.oldVersions = [
            currentCard.data.getCard,
          ];
        }
        try {
          await API.graphql(
            graphqlOperation(updateVersionsCardMutation, {
              input: {
                id: currentCardVersion.data.getCardVersion.id,
                oldVersions: currentCardVersion.data.getCardVersion.oldVersions,
              },
            })
          );
        } catch (error) {
          console.log("updateVersionsCardMutation error", error);
          return Promise.reject(error);
        }
      }

      // remove old updatedAt to use the most recent date
      delete cardData.updatedAt;
      try {
        await API.graphql(
          graphqlOperation(updateCardMutation, {
            input: cardData,
          })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("updateCardMutation error", error);
        return Promise.reject(error);
      }
    },

    async submitCard(_, data) {
      let { file, cardData } = data;

      // replace old updatedAt with the current date
      const now = new Date();
      cardData.updatedAt = now.toISOString();

      let currentCardVersion = await API.graphql({
        query: getCardVersionQuery,
        variables: { id: cardData.id },
      });

      if (currentCardVersion.data.getCardVersion == null) {
        //insert
        try {
          await API.graphql(
            graphqlOperation(createVersionsCardMutation, {
              input: {
                id: cardData.id,
                newVersions: [cardData],
                oldVersions: [],
              },
            })
          );
        } catch (error) {
          console.log("createVersionsCardMutation error", error);
          return Promise.reject(error);
        }
      } else {
        //update
        if (Array.isArray(currentCardVersion.data.getCardVersion.newVersions)) {
          currentCardVersion.data.getCardVersion.newVersions.push(cardData);
        } else {
          currentCardVersion.data.getCardVersion.newVersions = [cardData];
        }
        try {
          await API.graphql(
            graphqlOperation(updateVersionsCardMutation, {
              input: {
                id: currentCardVersion.data.getCardVersion.id,
                newVersions: currentCardVersion.data.getCardVersion.newVersions,
              },
            })
          );
          return Promise.resolve("success");
        } catch (error) {
          console.log("updateVersionsCardMutation error", error);
          return Promise.reject(error);
        }
      }
    },

    async deleteSubmitCard(_, data) {
      let { file, cardData, position } = data;
      let currentCardVersion = (
        await API.graphql({
          query: getCardVersionQuery,
          variables: { id: cardData.id },
        })
      ).data.getCardVersion;

      try {
        currentCardVersion.newVersions.splice(position, 1);
        await API.graphql(
          graphqlOperation(updateVersionsCardMutation, {
            input: {
              id: cardData.id,
              newVersions: currentCardVersion.newVersions,
            },
          })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("updateVersionsCardMutation error", error);
        return Promise.reject(error);
      }
    },

    async getCardsVersionsData({ commit }) {
      var cardsData = await API.graphql({
        query: listCardVersionsQuery,
      });
      commit("setCardVersions", cardsData.data.listCardVersions.items);
      while (cardsData.data.listCardVersions.nextToken) {
        cardsData = await API.graphql({
          query: listCardVersionsQuery,
          variables: {
            nextToken: cardsData.data.listCardVersions.nextToken,
          },
        });
        commit("appendCardVersions", cardsData.data.listCardVersions.items);
      }
    },

    async getCardList(_, cardIdList) {
      let filterId = [];
      let cardList = [];
      var cardListQuery;
      var nextToken;
      for (var i = 0; i < cardIdList.length; i++) {
        filterId.push({ id: { eq: cardIdList[i] } });
      }
      do {
        cardListQuery = await API.graphql({
          query: listCardsQuery,
          variables: {
            filter: { or: filterId },
            nextToken: nextToken,
          },
          authMode: "API_KEY",
        });
        cardList = cardList.concat(cardListQuery.data.listCards.items);
        nextToken = cardListQuery.data.listCards.nextToken;
      } while (cardListQuery.data.listCards.nextToken);

      return cardList;
    },
    async getCardsData({ commit }) {
      var cardsData = await API.graphql({
        query: listCardsQuery,
        authMode: "API_KEY",
      });
      commit("setCards", cardsData.data.listCards.items);
      while (cardsData.data.listCards.nextToken) {
        cardsData = await API.graphql({
          query: listCardsQuery,
          variables: { nextToken: cardsData.data.listCards.nextToken },
          authMode: "API_KEY",
        });
        commit("appendCards", cardsData.data.listCards.items);
      }
    },
    async createCard(_, data) {
      const {
        aws_user_files_s3_bucket_region: region,
        aws_user_files_s3_bucket: bucket,
      } = awsconfig;
      const { file, cardData } = data;
      // const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const cardId = uuid();
      // const key = `images/${cardId}.${extension}`;
      // const inputData = {
      //   id: cardId,
      //   photoAlbumId: id,
      //   contentType: mimeType,
      //   fullsize: {
      //     key,
      //     region,
      //     bucket,
      //   },
      // };

      //s3 bucket storage add file to it
      try {
        // await Storage.put(key, file, {
        //   level: "protected",
        //   contentType: mimeType,
        //   metadata: { albumId: id, cardId },
        // });
        await API.graphql(
          graphqlOperation(createCardMutation, { input: cardData })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("createCard error", error);
        return Promise.reject(error);
      }
    },

    /**
     * Artifacts
     */
    async getArtifact(_, artifactId) {
      return await API.graphql({
        query: getArtifactQuery,
        variables: { id: artifactId },
        authMode: "API_KEY",
      });
    },

    async updateArtifact(_, data) {
      let { file, artifactData } = data;

      const currentArtifact = await API.graphql({
        query: getArtifactQuery,
        variables: { id: artifactData.id },
        authMode: "API_KEY",
      });

      let currentArtifactVersion = await API.graphql({
        query: getArtifactVersionQuery,
        variables: { id: artifactData.id },
      });

      if (currentArtifactVersion.data.getArtifactVersion == null) {
        //insert
        try {
          await API.graphql(
            graphqlOperation(createVersionsArtifactMutation, {
              input: {
                id: artifactData.id,
                newVersions: [],
                oldVersions: [currentArtifact.data.getArtifact],
              },
            })
          );
        } catch (error) {
          console.log("createVersionsArtifactMutation error", error);
          return Promise.reject(error);
        }
      } else {
        //update
        if (
          Array.isArray(
            currentArtifactVersion.data.getArtifactVersion.oldVersions
          )
        ) {
          currentArtifactVersion.data.getArtifactVersion.oldVersions.push(
            currentArtifact.data.getArtifact
          );
        } else {
          currentArtifactVersion.data.getArtifactVersion.oldVersions = [
            currentArtifact.data.getArtifact,
          ];
        }
        try {
          await API.graphql(
            graphqlOperation(updateVersionsArtifactMutation, {
              input: {
                id: currentArtifactVersion.data.getArtifactVersion.id,
                oldVersions:
                  currentArtifactVersion.data.getArtifactVersion.oldVersions,
              },
            })
          );
        } catch (error) {
          console.log("updateVersionsArtifactMutation error", error);
          return Promise.reject(error);
        }
      }

      // remove old updatedAt to use the most recent date
      delete artifactData.updatedAt;
      try {
        await API.graphql(
          graphqlOperation(updateArtifactMutation, {
            input: artifactData,
          })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("updateArtifactMutation error", error);
        return Promise.reject(error);
      }
    },

    async submitArtifact(_, data) {
      let { file, artifactData } = data;

      // replace old updatedAt with the current date
      const now = new Date();
      artifactData.updatedAt = now.toISOString();

      let currentArtifactVersion = await API.graphql({
        query: getArtifactVersionQuery,
        variables: { id: artifactData.id },
      });

      if (currentArtifactVersion.data.getArtifactVersion == null) {
        //insert
        try {
          await API.graphql(
            graphqlOperation(createVersionsArtifactMutation, {
              input: {
                id: artifactData.id,
                newVersions: [artifactData],
                oldVersions: [],
              },
            })
          );
        } catch (error) {
          console.log("createVersionsArtifactMutation error", error);
          return Promise.reject(error);
        }
      } else {
        //update
        if (
          Array.isArray(
            currentArtifactVersion.data.getArtifactVersion.newVersions
          )
        ) {
          currentArtifactVersion.data.getArtifactVersion.newVersions.push(
            artifactData
          );
        } else {
          currentArtifactVersion.data.getArtifactVersion.newVersions = [
            artifactData,
          ];
        }
        try {
          await API.graphql(
            graphqlOperation(updateVersionsArtifactMutation, {
              input: {
                id: currentArtifactVersion.data.getArtifactVersion.id,
                newVersions:
                  currentArtifactVersion.data.getArtifactVersion.newVersions,
              },
            })
          );
          return Promise.resolve("success");
        } catch (error) {
          console.log("updateVersionsArtifactMutation error", error);
          return Promise.reject(error);
        }
      }
    },

    async deleteSubmitArtifact(_, data) {
      let { file, artifactData, position } = data;
      let currentArtifactVersion = (
        await API.graphql({
          query: getArtifactVersionQuery,
          variables: { id: artifactData.id },
        })
      ).data.getArtifactVersion;

      try {
        currentArtifactVersion.newVersions.splice(position, 1);
        await API.graphql(
          graphqlOperation(updateVersionsArtifactMutation, {
            input: {
              id: artifactData.id,
              newVersions: currentArtifactVersion.newVersions,
            },
          })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("updateVersionsArtifactMutation error", error);
        return Promise.reject(error);
      }
    },

    async getArtifactsVersionsData({ commit }) {
      var artifactsData = await API.graphql({
        query: listArtifactVersionsQuery,
      });
      commit(
        "setArtifactVersions",
        artifactsData.data.listArtifactVersions.items
      );
      while (artifactsData.data.listArtifactVersions.nextToken) {
        artifactsData = await API.graphql({
          query: listArtifactVersionsQuery,
          variables: {
            nextToken: artifactsData.data.listArtifactVersions.nextToken,
          },
        });
        commit(
          "appendArtifactVersions",
          artifactsData.data.listArtifactVersions.items
        );
      }
    },

    async getArtifactsData({ commit }) {
      var artifactsData = await API.graphql({
        query: listArtifactsQuery,
        authMode: "API_KEY",
      });
      commit("setArtifacts", artifactsData.data.listArtifacts.items);
      while (artifactsData.data.listArtifacts.nextToken) {
        artifactsData = await API.graphql({
          query: listArtifactsQuery,
          variables: { nextToken: artifactsData.data.listArtifacts.nextToken },
          authMode: "API_KEY",
        });
        commit("appendArtifacts", artifactsData.data.listartifacts.items);
      }
    },
    async createArtifact(_, data) {
      const {
        aws_user_files_s3_bucket_region: region,
        aws_user_files_s3_bucket: bucket,
      } = awsconfig;
      const { file, artifactData } = data;
      // const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const artifactId = uuid();
      // const key = `images/${cardId}.${extension}`;
      // const inputData = {
      //   id: cardId,
      //   photoAlbumId: id,
      //   contentType: mimeType,
      //   fullsize: {
      //     key,
      //     region,
      //     bucket,
      //   },
      // };

      //s3 bucket storage add file to it
      try {
        // await Storage.put(key, file, {
        //   level: "protected",
        //   contentType: mimeType,
        //   metadata: { albumId: id, cardId },
        // });
        await API.graphql(
          graphqlOperation(createArtifactMutation, { input: artifactData })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("createArtifact error", error);
        return Promise.reject(error);
      }
    },

    /**
     * Equipments
     */
    async getEquipment(_, equipmentId) {
      return await API.graphql({
        query: getEquipmentQuery,
        variables: { id: equipmentId },
        authMode: "API_KEY",
      });
    },

    async updateEquipment(_, data) {
      let { file, equipmentData } = data;

      const currentEquipment = await API.graphql({
        query: getEquipmentQuery,
        variables: { id: equipmentData.id },
        authMode: "API_KEY",
      });

      let currentEquipmentVersion = await API.graphql({
        query: getEquipmentVersionQuery,
        variables: { id: equipmentData.id },
      });

      if (currentEquipmentVersion.data.getEquipmentVersion == null) {
        //insert
        try {
          await API.graphql(
            graphqlOperation(createVersionsEquipmentMutation, {
              input: {
                id: equipmentData.id,
                newVersions: [],
                oldVersions: [currentEquipment.data.getEquipment],
              },
            })
          );
        } catch (error) {
          console.log("createVersionsEquipmentMutation error", error);
          return Promise.reject(error);
        }
      } else {
        //update
        if (
          Array.isArray(
            currentEquipmentVersion.data.getEquipmentVersion.oldVersions
          )
        ) {
          currentEquipmentVersion.data.getEquipmentVersion.oldVersions.push(
            currentEquipment.data.getEquipment
          );
        } else {
          currentEquipmentVersion.data.getEquipmentVersion.oldVersions = [
            currentEquipment.data.getEquipment,
          ];
        }
        try {
          await API.graphql(
            graphqlOperation(updateVersionsEquipmentMutation, {
              input: {
                id: currentEquipmentVersion.data.getEquipmentVersion.id,
                oldVersions:
                  currentEquipmentVersion.data.getEquipmentVersion.oldVersions,
              },
            })
          );
        } catch (error) {
          console.log("updateVersionsEquipmentMutation error", error);
          return Promise.reject(error);
        }
      }

      // remove old updatedAt to use the most recent date
      delete equipmentData.updatedAt;
      try {
        await API.graphql(
          graphqlOperation(updateEquipmentMutation, {
            input: equipmentData,
          })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("updateEquipmentMutation error", error);
        return Promise.reject(error);
      }
    },

    async submitEquipment(_, data) {
      let { file, equipmentData } = data;

      // replace old updatedAt with the current date
      const now = new Date();
      equipmentData.updatedAt = now.toISOString();

      let currentEquipmentVersion = await API.graphql({
        query: getEquipmentVersionQuery,
        variables: { id: equipmentData.id },
      });

      if (currentEquipmentVersion.data.getEquipmentVersion == null) {
        //insert
        try {
          await API.graphql(
            graphqlOperation(createVersionsEquipmentMutation, {
              input: {
                id: equipmentData.id,
                newVersions: [equipmentData],
                oldVersions: [],
              },
            })
          );
        } catch (error) {
          console.log("createVersionsEquipmentMutation error", error);
          return Promise.reject(error);
        }
      } else {
        //update
        if (
          Array.isArray(
            currentEquipmentVersion.data.getEquipmentVersion.newVersions
          )
        ) {
          currentEquipmentVersion.data.getEquipmentVersion.newVersions.push(
            equipmentData
          );
        } else {
          currentEquipmentVersion.data.getEquipmentVersion.newVersions = [
            equipmentData,
          ];
        }
        try {
          await API.graphql(
            graphqlOperation(updateVersionsEquipmentMutation, {
              input: {
                id: currentEquipmentVersion.data.getEquipmentVersion.id,
                newVersions:
                  currentEquipmentVersion.data.getEquipmentVersion.newVersions,
              },
            })
          );
          return Promise.resolve("success");
        } catch (error) {
          console.log("updateVersionsEquipmentMutation error", error);
          return Promise.reject(error);
        }
      }
    },

    async deleteSubmitEquipment(_, data) {
      let { file, equipmentData, position } = data;
      let currentEquipmentVersion = (
        await API.graphql({
          query: getEquipmentVersionQuery,
          variables: { id: equipmentData.id },
        })
      ).data.getEquipmentVersion;

      try {
        currentEquipmentVersion.newVersions.splice(position, 1);
        await API.graphql(
          graphqlOperation(updateVersionsEquipmentMutation, {
            input: {
              id: equipmentData.id,
              newVersions: currentEquipmentVersion.newVersions,
            },
          })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("updateVersionsEquipmentMutation error", error);
        return Promise.reject(error);
      }
    },

    async getEquipmentsVersionsData({ commit }) {
      var equipmentsData = await API.graphql({
        query: listEquipmentVersionsQuery,
      });
      commit(
        "setEquipmentVersions",
        equipmentsData.data.listEquipmentVersions.items
      );
      while (equipmentsData.data.listEquipmentVersions.nextToken) {
        equipmentsData = await API.graphql({
          query: listEquipmentVersionsQuery,
          variables: {
            nextToken: equipmentsData.data.listEquipmentVersions.nextToken,
          },
        });
        commit(
          "appendEquipmentVersions",
          equipmentsData.data.listEquipmentVersions.items
        );
      }
    },

    async getEquipmentsData({ commit }) {
      var equipmentsData = await API.graphql({
        query: listEquipmentsQuery,
        authMode: "API_KEY",
      });
      commit("setEquipments", equipmentsData.data.listEquipments.items);
      while (equipmentsData.data.listEquipments.nextToken) {
        equipmentsData = await API.graphql({
          query: listEquipmentsQuery,
          variables: {
            nextToken: equipmentsData.data.listEquipments.nextToken,
          },
          authMode: "API_KEY",
        });
        commit("appendEquipments", equipmentsData.data.listequipments.items);
      }
    },
    async createEquipment(_, data) {
      const {
        aws_user_files_s3_bucket_region: region,
        aws_user_files_s3_bucket: bucket,
      } = awsconfig;
      const { file, equipmentData } = data;
      // const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
      const equipmentId = uuid();
      // const key = `images/${cardId}.${extension}`;
      // const inputData = {
      //   id: cardId,
      //   photoAlbumId: id,
      //   contentType: mimeType,
      //   fullsize: {
      //     key,
      //     region,
      //     bucket,
      //   },
      // };

      //s3 bucket storage add file to it
      try {
        // await Storage.put(key, file, {
        //   level: "protected",
        //   contentType: mimeType,
        //   metadata: { albumId: id, cardId },
        // });
        await API.graphql(
          graphqlOperation(createEquipmentMutation, { input: equipmentData })
        );
        return Promise.resolve("success");
      } catch (error) {
        console.log("createEquipment error", error);
        return Promise.reject(error);
      }
    },

     /**
     * Loadouts
     */
      async getLoadout(_, loadoutId) {
        return await API.graphql({
          query: getLoadoutQuery,
          variables: { id: loadoutId },
          authMode: "API_KEY",
        });
      },
  
      async updateLoadout(_, data) {
        let { file, loadoutData } = data;
        
        // remove old updatedAt to use the most recent date
        delete loadoutData.updatedAt;
        try {
          await API.graphql(
            graphqlOperation(updateLoadoutMutation, {
              input: loadoutData,
            })
          );
          return Promise.resolve("success");
        } catch (error) {
          console.log("updateLoadoutMutation error", error);
          return Promise.reject(error);
        }
      },
  
      async getLoadoutsData({ commit }) {
        var loadoutsData = await API.graphql({
          query: listLoadoutsQuery,
          authMode: "API_KEY",
        });
        commit("setLoadouts", loadoutsData.data.listLoadouts.items);
        while (loadoutsData.data.listLoadouts.nextToken) {
          loadoutsData = await API.graphql({
            query: listLoadoutsQuery,
            variables: {
              nextToken: loadoutsData.data.listLoadouts.nextToken,
            },
            authMode: "API_KEY",
          });
          commit("appendLoadouts", loadoutsData.data.listloadouts.items);
        }
      },

      async createLoadout(_, data) {
        const { file, loadoutData } = data;
        const loadoutId = uuid();
        try {
          let result = await API.graphql(
            graphqlOperation(createLoadoutMutation, { input: loadoutData })
          );
          return Promise.resolve("success", result);
        } catch (error) {
          console.log("createLoadout error", error);
          return Promise.reject(error);
        }
      },
  },

     
};
