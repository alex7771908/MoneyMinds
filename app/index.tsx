import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { supabase } from "./supabase"; // Import Supabase clients
const Tab = createBottomTabNavigator();

export default function Index() {
  return Tabs();
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../assets/images/icons/home-icon.svg")}
              style={{ width: size, height: size, marginTop: "30%" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonScreen}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../assets/images/icons/book-open-icon.svg")}
              style={{ width: size, height: size, marginTop: "30%" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <Image
              source={require("../assets/images/icons/male-icon.svg")}
              style={{ width: size, height: size, marginTop: "30%" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function LessonScreen() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase.from("lessons").select("*");
      if (error) {
        console.error("Error fetching lessons:", error);
      } else {
        setLessons(data);
      }
    };

    fetchLessons();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {lessons.map((lesson) => (
        <Lesson key={lesson.id} lesson={lesson} />
      ))}
    </View>
  );
}

const Lesson = ({ lesson }) => {
  const sideImagesUrls = JSON.parse(lesson.side_images_urls);

  return (
    <View style={styles.container}>
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <View style={{ height: "80%", width: "100%", flexDirection: "row" }}>
        <Image style={styles.mainImage} source={{ uri: lesson.main_image_url }} />
        <View style={styles.sideImageDiv}>
          {sideImagesUrls.map((url, index) => (
            <Image key={index} style={styles.sideImage} source={{ uri: url }} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignContent: "center",
    flexDirection: "column",
    height: "35%",
    marginBottom: "4%",
  },
  mainImage: {
    width: "60%",
    height: "100%",
    marginRight: "2%",
    marginLeft: "2%",
  },
  sideImage: {
    height: "48%",
    width: "100%",
  },
  sideImageDiv: {
    justifyContent: "space-between",
    width: "34%",
    marginRight: "2%",
  },
  lessonTitle: {
    fontSize: RFPercentage(7),
    marginLeft: "2%",
  },
});