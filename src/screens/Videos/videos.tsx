import React, { useContext } from "react";
import { Text, View } from "react-native";
import styles from "./videos.styles";
import { SafeAreaView } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../../utils/theme/theme.context";
import { StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import YoutubePlayer from "react-native-youtube-iframe";

const Videos = () => {
  const { theme } = useContext(ThemeContext);
  const toast = useToast();

  const pageStyles = StyleSheet.create({
    container: {
      ...styles.container,
      backgroundColor: theme.backgroundColor,
    },
    title: {
      ...styles.title,
      color: theme.titleColor,
      textDecorationColor: theme.titleColor,
    },
  });

  const onStateChange = (state: any) => {
    if (state === "ended") {
      toast.show("The video you watched has finished!");
    }
  };

  return (
    <SafeAreaView style={pageStyles.container}>
      <Text style={pageStyles.title}>Video receipes</Text>
      <ScrollView>
        <View>
          <YoutubePlayer
            height={250}
            videoId={"gqxG-nf4E_A"}
            onChangeState={onStateChange}
          />
        </View>
        <View>
          <YoutubePlayer
            height={250}
            videoId={"padVV-uenSk"}
            onChangeState={onStateChange}
          />
        </View>
        <View>
          <YoutubePlayer
            height={250}
            videoId={"3KAD2hVVJvg"}
            onChangeState={onStateChange}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Videos;
