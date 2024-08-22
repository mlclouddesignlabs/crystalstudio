# crystalstudio
crystalstudio
npm install -g expo-cli
expo login
npm install -g eas-cli
eas build -p android https://docs.expo.dev/build/setup/
eas build:configure
eas build -p android --profile preview

# command to forward port of android virtual device to local dev machine port
adb reverse tcp:3000 tcp:3000