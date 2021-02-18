<template>
  <div class="contact text-center">
    <h1>Contact Us</h1>
    <br />
    <v-card class="mx-auto pa-1" elevation="24" outlined shaped max-width="600">
      <v-row>
        <v-col cols="3" align-self="center">
          <v-icon x-large>mdi-discord</v-icon>
        </v-col>
        <v-col cols="9">
          <v-card-text>
            You can contact us directly via discord. Join our server and send a
            message to one of the users with the role "Admin".
            <a href="https://discord.gg/Ubaepf4pUJ">
              Click here to join our discord <v-icon>mdi-discord</v-icon>
            </a>
          </v-card-text>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="3" align-self="center">
          <v-icon x-large>mdi-email</v-icon>
        </v-col>
        <v-col cols="9">
          <v-card-text>
            If you prefer you can send us an email to:
            <a href="mailto:magiclegendsarpg@gmail.com">
              magiclegendsarpg@gmail.com <v-icon>mdi-email</v-icon>
            </a>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
