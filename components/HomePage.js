import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import Card from './Card';
import Filters from './Filters';
import axios from 'axios';

function HomePage() {
  const [subredditsData, setSubredditsData] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [after, setAfter] = useState(null);

  const fetchData = (after = null) => {
    const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0Mzk3MjE4LCJpYXQiOjE2ODQzMTA4MTgsImp0aSI6IjMxOTc5NTQ5MTc4OTI5LW9yQ2pUZUtOejk5VkpJT0w1NHY0OXhnRlJZeHBvZyIsImNpZCI6ImlBanJEc0x5Rl9FU3RHSWFONDVOZ1EiLCJsaWQiOiJ0Ml9iYzM3OXc2NXQiLCJhaWQiOiJ0Ml9iYzM3OXc2NXQiLCJsY2EiOjE2ODQxNDg3ODc0MjAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.BnShEX1aOETDcKDskw01iDJkbvtHUYyFhnRwAfPuk7lFA1eTgVVBYVMUIJvzi6xk4Ma_V0BcUH-dtzpBhH1q9vl90QJS2mpzUjzESsMIc7-zmTTJe322JkHQWEo08FqRaHOxbd6pXnYq43dZsHjcEfvTsnKoHgxqvUSmdidmY4m6dcCR7PK--mBVBhWohIGnaOXWsFKWCKFs_pfU4OIpEmX8AW6od6q6Y0wWxEasrykIqt2hvxKhk2tVni77QMxSpQmet3lVcvFzl__CzXf1liXWJH-hAu14RGIZ6xAsSTmQtCETF0o5F32JrtE32f3WSmOgsOsbohfZTdFCWzSgJQ';

    const options = {
      method: 'GET',
      url: 'https://oauth.reddit.com/best',
      headers: {
          Authorization: "Bearer " + token,
      }
    }

    if (after) {
      // Append 'after' parameter to fetch the next page
      options.url += `?after=${after}`;
    }
      
    axios.request(options).then(function (res) {
      const data = res.data.data.children;
      const newAfter = res.data.data.after; // Get the 'after' value for pagination
      const newSubredditsData = [...subredditsData, ...data];
      setSubredditsData(newSubredditsData);
      setImageUrl(newSubredditsData.map(item => item.data));
      setAfter(newAfter); // Update the 'after' value for pagination
    }).catch(function (error) {
      console.error(error);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    if (after) {
      fetchData(after);
    }
  };


  return (
    <>
      <Filters />
      {/* {subredditsData && subredditsData.map((subreddit, index) => (
        <Card key={index} subredditsData={subreddit} />
      ))} */}

      <FlatList
        data={subredditsData}
        renderItem={({ item }) => <Card subredditsData={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
}

export default HomePage;
