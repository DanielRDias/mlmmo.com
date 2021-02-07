import { API, graphqlOperation, Storage } from "aws-amplify";
import { createDeck as createDeckMutation } from "@/graphql/mutations";
import { createCard as createCardMutation } from "@/graphql/mutations";
import { getDeck as getDeckQuery } from "@/graphql/queries";
import { getCard as getCardQuery } from "@/graphql/queries";
import { listDecks as listDecksQuery } from "@/graphql/queries";
import { listCards as listCardsQuery } from "@/graphql/queries";
import { v4 as uuid } from "uuid";
import awsconfig from "@/aws-exports";

export const cardInfo = {
  namespaced: true,
  state: {
    decks: null,
    cards: null,
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
    setCards(state, payload) {
      state.cards = payload;
    },
  },
  actions: {
    async createDeck(_, data) {
      try {
        console.log(data);
        await API.graphql(
          graphqlOperation(createDeckMutation, { input: data })
        );
      } catch (error) {
        console.error("createdeck", error);
      }
    },
    async getDeck(_, deckId) {
      return await API.graphql(graphqlOperation(getDeckQuery, { id: deckId }));
    },
    async getDecksData({ commit }) {
      const decksData = await API.graphql({
        query: listDecksQuery,
        authMode: "API_KEY",
      });
      commit("setDecks", decksData.data.listDecks.items);
    },
    async getCard(_, cardId) {
      return await API.graphql(graphqlOperation(getCardQuery, { id: cardId }));
    },
    async getCardsData({ commit }) {
      const cardsData = await API.graphql({
        query: listCardsQuery,
        authMode: "API_KEY",
      });
      commit("setCards", cardsData.data.listCards.items);
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
  },
  getters: {
    cards: (state) => state.cards,
    decks: (state) => state.decks,
    newDeck: (state) => state.newDeck,
    newDeckCards: (state) => state.newDeckCards,
  },
};
