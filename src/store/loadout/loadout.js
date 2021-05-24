import { API, graphqlOperation } from "aws-amplify";

import { getLoadout as getLoadoutQuery } from "@/graphql/queries";
import { listLoadouts as listLoadoutsQuery } from "@/graphql/queries";
import { createLoadout as createLoadoutMutation } from "@/graphql/mutations";
import { updateLoadout as updateLoadoutMutation } from "@/graphql/mutations";

import { v4 as uuid } from "uuid";

export const loadout = {
  namespaced: true,

  state: {
    loadouts: null,
  },

  getters: {
    loadouts: (state) => state.loadouts,
  },

  mutations: {
    setLoadouts(state, payload) {
      state.loadouts = payload;
    },
    appendLoadouts(state, payload) {
      state.loadouts = state.loadout.concat(payload);
    },
  },

  actions: {
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
        return Promise.resolve(result);
      } catch (error) {
        console.log("createLoadout error", error);
        return Promise.reject(error);
      }
    },
  },
};
