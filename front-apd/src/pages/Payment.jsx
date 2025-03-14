import axios from "axios";

const getNicePayToken = async () => {
  try {
    const response = await axios.post(
      "https://api.nicepay.co.kr/v1/access-token",
      new URLSearchParams({ grant_type: "client_credentials" }).toString(), // x-www-form-urlencoded 방식
      {
        headers: {
          Authorization: `Basic ${btoa("S2_1ec4a5325bc740acb188f9f1b51df216:682b6513b93f423daec295380efbb535")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("✅ Token:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching token:", error.response?.data || error.message);
  }
};

// 실행
getNicePayToken();
