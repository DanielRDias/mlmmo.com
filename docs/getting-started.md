---
title: Getting Started
---

# Goal

This document will take you through the steps of getting [mlarpg.com](https://www.mlarpg.com/) running on your own machine.

# Prerequisite

This document assumes you are working on a Mac and that you have a working knowledge of Git, Vue, Node, Yarn, and AWS Amplify. 

If you don't, you are still encouraged to follow the document until you get stuck. At which point, it is recommended to find additional reference material to help yourself get unstuck. Or to ask for help in the discord.

# Get the project code

Open up the terminal and git clone the project.

### ./
```bash
git clone https://github.com/DanielRDias/mlmmo.com.git
```

Change your terminal directory to the project root.

### ./
```bash
cd mlmmo.com
```

# Project Setup

---

## Run yarn install

### ./
```shell
yarn install
```

---

## Configure Amplify.

### ./
```shell
amplify configure
```

**This configure command is having me make and login into an AWS account?**

Yup, this document currently assumes you are going to make an account on AWS in order to have your own copy of the [mlarpg](https://www.mlarpg.com/) backend for testing.

There should be a 12 month long [free tier](https://aws.amazon.com/amplify/pricing/?nc=sn&loc=3) for amplify, but please do your own research to ensure this statement is valid.

You *can* remove amplify from your local copy to be able to build the project without this requirement. Cleaner solutions are probably possible but haven't yet been documented or implemented.

---

## Initialize the AWS Amplify project

### ./
```shell
amplify init
```

You can just enter through all the options presented.

For the options that force an input, provide any value and move on.

```
# Output example

...

? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile

...

⠋ Initializing project in the cloud...

...
 
 Enter your Facebook App ID for your OAuth flow:  .
 Enter your Facebook App Secret for your OAuth flow:  .
  
 You've opted to allow users to authenticate via Google.  If you haven't already, you'll need to go to https://developers.google.com/
identity and create an App ID. 
 
 Enter your Google Web Client ID for your OAuth flow:  .
 Enter your Google Web Client Secret for your OAuth flow:  .
? Enter the Google reCaptcha secret key: 
? Enter the URL that your users will be redirected to upon account confirmation: 
? Enter the subject for your custom account confirmation email: 
? Enter the body text for your custom account confirmation email (this will appear before the link URL): 
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!

...
```

**Facebook App ID and Google Web Client ID?**

You may have noticed Facebook and Google API keys and tokens as required values. 

These are only for Oauth login methods. You could go onto the Facebook and Google developer dashboards and create app projects to get these values for your testing, but that is out of the scope of this document and not needed for getting started.

---

## Push Amplify project

### ./
```shell
amplify push
```

Select **Y**(Yes) for all given options.

---


## Run the mock API.

### ./
```shell
 amplify mock api
```

Open the [mock API](http://localhost:20002/). 

Select **[Auth - User Pool]** and **[Updated Auth]**.

Enter a **username**, and add `Admin` and `Moderator` for the **groups** input box.  

Click **[Generate Token]**.

Your future mock GraphQL calls will use this created auth instance automatically.


## Create the Mock Data

Enter the following text into the GraphiQL Editor.

### http://localhost:20002/
```graphql
mutation CreateCard {
  createWhiteCreature: createCard(
    input: {name: "Faithful Geist", imgUrl: "https://i.imgur.com/NV5M6G0.png", imgFullSize: null, imgThumbnail: null, cost: "1WW", cmc: 3, color: "White", type: "Creature", points: "2", power: "3", toughness: "2", rarity: "uncommon", description: "On Death: You and creatures you control gain 401 shield for 10 seconds.\nActivated Ability W (white mana): Sacrifice Faithful Geist. (If this spell enters your hand while you control the creature, it becomes this ability instead.)", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T11:57:17.709Z", updatedAt: "2021-03-19T08:26:19.196Z", version: null, properties: [{rank: 1, damage: "0", healing: null, health: "550", dps: "15", role: "?", duration: "?", range: "0", area: "?"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}]}
  ) {
    id
  }
  createWhiteSorcery: createCard(
    input: {name: "Radiant Shield", imgUrl: "https://i.imgur.com/YDnkkWg.png", imgFullSize: null, imgThumbnail: null, cost: "3WW", cmc: 5, color: "White", type: "Sorcery", points: "0", power: null, toughness: null, rarity: "uncommon", properties: [{rank: 1, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "You and creatures you control gain 3,851 (at rank 1) shield for 10 seconds.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T12:37:09.035Z", updatedAt: "2021-03-20T02:50:29.797Z", version: null}
  ) {
    id
  }
  createChest: createEquipment(
    input: {name: "Attire of Calamity", imgUrl: "https://i.imgur.com/AkGYJ1s.jpg", imgFullSize: null, imgThumbnail: null, imgTmogUrl: null, imgTmogFullSize: null, imgTmogThumbnail: null, rarity: "Uncommon", slot: "Body", description: "Whenever you activate your Utility Ability, 36% chance to create a 6/1 Elemental creature token with Greater Swiftness for 15 seconds", mods: ["Whenever you activate your Secondary Ability, 17% chance for your weakest creature to get +3/-2 for 10 seconds", "+29 Health Regenartion Rating (In-combat health regeneration)", "+100 Ultility Ability Potency (Damage output of the Utility Ability)", "+100 Incoming Healing Rating (Effectiveness of incoming heals)"], updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-03-12T17:39:41.699Z", updatedAt: "2021-03-12T18:13:19.010Z", version: null}
  ) {
    id
  }
  createGreater: createArtifact(
    input: {name: "Benalish Heirloom", imgUrl: "https://i.imgur.com/z4VDcZs.png", imgFullSize: null, imgThumbnail: null, rarity: "Greater", tier: "Greater", description: "Whenever you cast a healing spell, create a 1/1 white Human Soldier creature token for 10 seconds, then creatures you control gain Lesser Swiftness for 5.3 seconds.", bonusR10: "+125 White Mana Buff Rating (Buff duration of white sources)", bonusR20: "+1 second of Soldier token duration for each Creature spell in your deck.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-27T16:36:51.484Z", updatedAt: "2021-03-18T10:18:55.536Z", version: null}
  ) {
    id
  }
  createCardTest_1: createCard(
    input: {name: "Experimental Sentinel 1", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }
  createCardTest_2: createCard(
    input: {name: "Experimental Sentinel 2", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }
  createCardTest_3: createCard(
    input: {name: "Experimental Sentinel 3", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }
createCardTest_4: createCard(
    input: {name: "Experimental Sentinel 4", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }

createCardTest_5: createCard(
    input: {name: "Experimental Sentinel 5", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }

createCardTest_6: createCard(
    input: {name: "Experimental Sentinel 6", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }

createCardTest_7: createCard(
    input: {name: "Experimental Sentinel 7", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }

createCardTest_8: createCard(
    input: {name: "Experimental Sentinel 8", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }

createCardTest_9: createCard(
    input: {name: "Experimental Sentinel 9", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }

createCardTest_10: createCard(
    input: {name: "Experimental Sentinel 10", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }

createCardTest_11: createCard(
    input: {name: "Experimental Sentinel 11", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }

createCardTest_12: createCard(
    input: {name: "Experimental Sentinel 12", imgUrl: "https://i.imgur.com/vax1fno.png\n", imgFullSize: null, imgThumbnail: null, cost: "6", cmc: 6, color: "Colorless", type: "Creature", points: "0", power: null, toughness: null, rarity: null, properties: [{rank: 1, damage: "628 ", healing: null, health: "7929", dps: "81", role: "N/A", duration: "N/A", range: "0", area: "N/A"}, {rank: 2, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 3, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 4, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 5, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 6, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 7, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 8, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 9, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}, {rank: 10, damage: "0", healing: null, health: "0", dps: "?", role: "?", duration: "?", range: "0", area: "?"}], description: "Whenever and artifact creature enters the battlefield under your control, heal for 346 times the combined power and toughness of that creature.\n\nSpecial Ability: Charge forward and deal 628 (at rank 1) damage  to foes in a line.", updatedBy: "anonymous", updatedById: "abc:123", createdAt: "2021-02-15T19:05:23.363Z", updatedAt: "2021-03-20T02:46:47.780Z", version: null}
  ) {
    id
  }
}
```

**Getting a "message": "Unauthorized" error?***

Try using a different web browser. For example, use Safari if Google Chrome is not working. The issue should go away.

**Generating the content still didn't work?**

The website is under development, so various APIs may change since this document has last been updated. It is recommended to check the error message and tweak the example GraphQL queries until you arrive at a version that works with the modified website.

You can check the [production website's](https://www.mlarpg.com/) network responses for current states of the graph objects.

---

In a new terminal under the project root, run the project.


### ./
```shell
cd mlmmo.com
yarn run serve
```

---

Go to the URL, and view the [cards](http://localhost:8080/cards) page.

You will see the mocks created from the [Create the mock data] step.

---

### Create a deck

Head over to the [Create New Deck](http://localhost:8080/adddeck) page, and build a deck with that mock data.

---

### Now what?

You are at an excellent point to start making your own additions to the website. Where you go from here is up to you!

Contact people on the discord for ideas.

