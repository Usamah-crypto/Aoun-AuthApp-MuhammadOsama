This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# React Native Firebase Auth & CRUD App

This mobile application is built with React Native and integrates Firebase Authentication for user sign-in, along with CRUD functionality for managing personal blog posts. Users can sign in using Google authentication, manage their profile information, create, read, update, and delete personal entries.

## Features

- **Firebase Authentication:**
  - Google Sign-In for user authentication.
  - Additional user profile fields (age, gender) can be updated.
  - Account deletion functionality.

- **CRUD:**
  - Create, read, update, and delete personal entries.
  - Store and manage enteries using Firebase Realtime Database.

- **UI/UX & Additional Functionality:**
  - Multi-language support.
  - Onboarding experience for new users.
  - Animations for nice user interaction.
 
## Demo
A demo video showcasing the app's functionality can be found [here](https://drive.google.com/file/d/1heZNBFxSTITNiqGhuoaSJM_2CbFo3VHe/view?usp=sharing).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm install

```bash
# using npm
npm start

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

### For iOS

```bash
# using npm
cd ios && pod install

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!


# aounAssessment_MuhammadOsama
