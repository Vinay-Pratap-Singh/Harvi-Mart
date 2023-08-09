import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import Layout from "../Layout/Layout";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { nanoid } from "@reduxjs/toolkit";
import {
  IcategoryDetails,
  IordersData,
  Iproduct,
} from "../../helper/interfaces";
import PillsData from "../../components/PillsData";
import PieChart from "../../components/PieChart";
import { useState, useEffect } from "react";

interface IpillData {
  id: string;
  pillIcon: React.ReactNode;
  pillTitle: string;
  pillDetail: number | string;
}

const Dashboard = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.category);
  const { coupons } = useSelector((state: RootState) => state.coupon);
  const { orders } = useSelector((state: RootState) => state.order);
  const { users } = useSelector((state: RootState) => state.user);
  const { reviews } = useSelector((state: RootState) => state.review);
  const [categoriesChartData, setCategoriesChartData] = useState<any>();
  const [reviewsChartData, setReviewsChartData] = useState<any>();

  // calculating the total earning
  let totalEarnedAmount = 0;
  orders.forEach((order: IordersData) => {
    totalEarnedAmount += order.total;
  });

  // data to display the pills
  const pillsData: IpillData[] = [
    {
      id: nanoid(),
      pillIcon: <AiOutlineShoppingCart fontSize={24} color="#DD6B20" />,
      pillTitle: "Total Products",
      pillDetail: products.length,
    },
    {
      id: nanoid(),
      pillIcon: <BiCategory fontSize={24} color="#DD6B20" />,
      pillTitle: "Total Categories",
      pillDetail: categories.length,
    },
    {
      id: nanoid(),
      pillIcon: <FaRegMoneyBillAlt fontSize={24} color="#DD6B20" />,
      pillTitle: "Total Coupons",
      pillDetail: coupons.length,
    },
    {
      id: nanoid(),
      pillIcon: <IoNewspaperOutline fontSize={24} color="#DD6B20" />,
      pillTitle: "Total Orders",
      pillDetail: orders.length,
    },
    {
      id: nanoid(),
      pillIcon: <FiUsers fontSize={24} color="#DD6B20" />,
      pillTitle: "Total Users",
      pillDetail: users.length,
    },
    {
      id: nanoid(),
      pillIcon: <GiMoneyStack fontSize={24} color="#DD6B20" />,
      pillTitle: "Total Earnings",
      pillDetail: `Rs ${totalEarnedAmount}`,
    },
  ];

  // function to generate unique colors
  const generateUniqueColors = (count: number) => {
    const colors = [];
    const step = 360 / count;

    for (let i = 0; i < count; i++) {
      const hue = (i * step) % 360;
      const saturation = 70; // Adjust saturation and lightness as needed
      const lightness = 50;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      colors.push(color);
    }

    return colors;
  };

  // function to generate darker color to hover on chart
  const darkenColors = (colors: any) => {
    return colors.map((color: any) => {
      const [hue, saturation, lightness] = color.match(/\d+/g).map(Number);
      const darkenedLightness = Math.max(lightness - 20, 0);
      return `hsl(${hue}, ${saturation}%, ${darkenedLightness}%)`;
    });
  };

  // getting the chart data for category
  useEffect(() => {
    const chartData: { name: string; items: number }[] = [];
    categories.length &&
      categories.forEach((category) =>
        chartData.push({ name: category.name, items: 0 })
      );

    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < chartData.length; j++) {
        if (chartData[j]?.name === products[i]?.category?.name) {
          chartData[j].items += 1;
          break;
        }
      }
    }

    const uniqueColor = generateUniqueColors(chartData.length);
    setCategoriesChartData({
      labels: chartData.map((categoryName) => categoryName?.name),
      datasets: [
        {
          data: chartData.map((categoryName) => categoryName?.items),
          backgroundColor: uniqueColor,
          hoverBackgroundColor: darkenColors(uniqueColor),
        },
      ],
    });
  }, [categories, products]);

  // getting the chart data for review
  useEffect(() => {
    const reviewStar = {
      oneStar: 0,
      twoStar: 0,
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
    };
    reviews.length &&
      reviews.forEach((review: any) => {
        const rating = review?.rating;
        switch (rating) {
          case 1: {
            reviewStar.oneStar += 1;
            break;
          }
          case 2: {
            reviewStar.twoStar += 1;
            break;
          }
          case 3: {
            reviewStar.threeStar += 1;
            break;
          }
          case 4: {
            reviewStar.fourStar += 1;
            break;
          }
          case 5: {
            reviewStar.fiveStar += 1;
            break;
          }
        }
      });

    const uniqueColor = generateUniqueColors(5);
    setReviewsChartData({
      labels: ["One Star", "Two Star", "Three Star", "Four Star", "Five Star"],
      datasets: [
        {
          data: Object.values(reviewStar),
          backgroundColor: uniqueColor,
          hoverBackgroundColor: darkenColors(uniqueColor),
        },
      ],
    });
  }, [reviews]);

  return (
    <Layout>
      {/* adding the dynamic meta data */}
      <Helmet>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="Gain Insights with Harvi Mart's Comprehensive Dashboard - Track total sales, earnings, categories, products, and more through interactive charts and analytics. Make data-driven decisions and stay informed with our intuitive admin dashboard. Empower your business with Harvi Mart's powerful insights."
        />
      </Helmet>

      <VStack minH={"100vh"} w="full" pt={5} pl={60} gap={10}>
        <Heading fontSize={"3xl"}>
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Admin Dashboard
          </Text>{" "}
        </Heading>

        {/* displaying the catrgory and review charts */}
        <HStack gap={10} alignItems={"center"}>
          {/* category chart */}
          <VStack gap={2} alignItems={"center"} justifyContent={"center"}>
            <PieChart data={categoriesChartData} />
            <Heading fontSize={"xl"}>Products in categories</Heading>
          </VStack>

          {/* review chart */}
          <VStack gap={2} alignItems={"center"} justifyContent={"center"}>
            <PieChart data={reviewsChartData} />
            <Heading fontSize={"xl"}>Average products review</Heading>
          </VStack>
        </HStack>

        {/* displaying the records pills */}
        <HStack
          flexWrap={"wrap"}
          gap={5}
          alignItems={"center"}
          justifyContent={"center"}
          pb={10}
        >
          {pillsData?.map((pill: IpillData) => {
            return <PillsData key={pill?.id} data={pill} />;
          })}
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Dashboard;
