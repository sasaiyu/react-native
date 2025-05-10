import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '@expo/ui/jetpack-compose';

export default function Page() {
  return (
    <View>
      <Text>Home page</Text>
      <Link href='(tabs)'>Tabs</Link>
      <Button style={{ flex: 1 }} onPress={() => {}}>
        Edit profile
      </Button>
    </View>
  );
}
