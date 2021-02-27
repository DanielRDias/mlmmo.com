import { API, graphqlOperation, Storage } from "aws-amplify";
import { createDeck as createDeckMutation } from "@/graphql/mutations";
import { deleteDeck as deleteDeckMutation } from "@/graphql/mutations";
import { createCard as createCardMutation } from "@/graphql/mutations";
import { createArtifact as createArtifactMutation } from "@/graphql/mutations";
import { getDeck as getDeckQuery } from "@/graphql/queries";
import { getCard as getCardQuery } from "@/graphql/queries";
import { getArtifact as getArtifactQuery } from "@/graphql/queries";
import { listDecks as listDecksQuery } from "@/graphql/queries";
import { listCards as listCardsQuery } from "@/graphql/queries";
import { listArtifacts as listArtifactsQuery } from "@/graphql/queries";
import { v4 as uuid } from "uuid";
import awsconfig from "@/aws-exports";

export const cardInfo = {
  namespaced: true,
  state: {
    decks: null,
    cards: null,
    artifacts: null,
    newDeck: null,
    newDeckCards: [],
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
    setArtifacts(state, payload) {
      state.artifacts = payload;
    },
    appendArtifacts(state, payload) {
      state.artifacts = state.artifacts.concat(payload);
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

    async getArtifactsData({ commit }) {
      var artifactsData = await API.graphql({
        query: listArtifactsQuery,
        authMode: "API_KEY",
      });
      commit("setArtifacts", artifactsData.data.listArtifacts.items);
      while (artifactsData.data.listArtifacts.nextToken) {
        cartifactsData = await API.graphql({
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
  },
  getters: {
    cards: (state) => state.cards,
    decks: (state) => state.decks,
    artifacts: (state) => state.artifacts,
    newDeck: (state) => state.newDeck,
    newDeckCards: (state) => state.newDeckCards,
  },
};
