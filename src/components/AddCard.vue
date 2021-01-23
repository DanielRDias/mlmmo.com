<template>
  <div class="home">
    <v-container id="user-profile-view" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card icon="mdi-account-outline">
            <h1>Add a card</h1>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field label="Card Name" />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field label="Cost" />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field label="CMC" type="number" />
                  </v-col>

                  <v-col cols="12" md="2">
                    <v-text-field label="Points" type="number" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="color"
                      :items="colors"
                      label="Color"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="Type" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R1 Damage" type="number" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R1 HP" type="number" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R1 Speed" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R1 Role" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R2 Damage" type="number" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R2 HP" type="number" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R2 Speed" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R2 Role" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R3 Damage" type="number" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R3 HP" type="number" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R3 Speed" />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field label="R3 Role" />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea label="Card description" />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn color="primary" min-width="150"> Submit </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AddCard",

  data: () => ({
    color: null,
    colors: ["Blue (U)", "Red (R)", "Green (G)", "Black (B)", "White (W)"],
    checkbox: false,
  }),
};
</script>
