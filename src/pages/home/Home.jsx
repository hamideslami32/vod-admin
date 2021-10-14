import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react";
import axios from "../../utils/plugins/axios";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjAwNzE5MGY5MGU4ZTVhOGVlNDljNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDE1NzEyMCwiZXhwIjoxNjM0NTg5MTIwfQ.AJGEGdN15CV4e7LTSk_7gRr_E_pU9ULfXyZb8yjmlHw",
          },
        });
        const statsList = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        statsList.map((item) => {
          return setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ]);
        });
      } catch (error) {
        console.log({ error });
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
