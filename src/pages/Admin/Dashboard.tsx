import {
  Box,
  HStack,
  Heading,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Layout from "../Layout/Layout";
import { Helmet } from "react-helmet";
import { AiOutlineFilePdf, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiCloudDownload, BiLoaderCircle } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { nanoid } from "@reduxjs/toolkit";
import { IordersData } from "../../helper/interfaces";
import PillsData from "../../components/PillsData";
import PieChart from "../../components/PieChart";
import { useState, useEffect, useRef } from "react";
import usePdfDownload from "../../helper/Hooks/usePdfDownload";
import { useAppSelector } from "../../helper/Hooks/redux";

interface IpillData {
  id: string;
  pillIcon: React.ReactNode;
  pillTitle: string;
  pillDetail: number | string;
}

const Dashboard = () => {
  const { products } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const { coupons } = useAppSelector((state) => state.coupon);
  const { orders } = useAppSelector((state) => state.order);
  const { users } = useAppSelector((state) => state.user);
  const { reviews } = useAppSelector((state) => state.review);

  const [categoriesChartData, setCategoriesChartData] = useState<any>();
  const [reviewsChartData, setReviewsChartData] = useState<any>();
  const report = useRef<HTMLDivElement>(null);
  const { generatePDF, pdfData, resetPdfData, isGenerating } = usePdfDownload();

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

      <VStack
        minH={"100vh"}
        w="full"
        pt={[12, 12, 12, 5]}
        pl={[0, 0, 0, 60]}
        gap={[5, 5, 5, 10]}
        pos={"relative"}
      >
        <Heading
          textAlign={["center", "center", "center", "initial"]}
          fontSize={["xl", "xl", "2xl", "3xl"]}
          w={["full", "full", "full", "auto"]}
        >
          Welcome to the{" "}
          <Text as={"span"} color={"primaryColor"}>
            Admin Dashboard
          </Text>{" "}
        </Heading>

        {/* adding the report download button */}
        <Box
          h={10}
          w={10}
          borderRadius={"full"}
          boxShadow={"md"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          color={"primaryColor"}
          cursor={"pointer"}
          pos={"absolute"}
          top={[0, null, null, 10]}
          right={[2, null, null, 16, 28]}
        >
          {pdfData ? (
            <Tooltip
              hasArrow
              label="Download Report"
              bgColor={"primaryColor"}
              color={"white"}
            >
              <a
                rel="noreferrer"
                href={URL.createObjectURL(pdfData)}
                download="Dashboard Report.pdf"
                onClick={resetPdfData}
              >
                <BiCloudDownload fontSize={28} />
              </a>
            </Tooltip>
          ) : !isGenerating ? (
            <Tooltip
              hasArrow
              label="Generate Report"
              bgColor={"primaryColor"}
              color={"white"}
            >
              <Text
                as={"span"}
                onClick={() => report.current && generatePDF(report.current)}
              >
                <AiOutlineFilePdf fontSize={28} />
              </Text>
            </Tooltip>
          ) : (
            <BiLoaderCircle fontSize={28} />
          )}
        </Box>

        <VStack gap={[5, 5, 5, 10]} ref={report}>
          {/* displaying the category and review charts */}
          <Stack
            direction={["column", "column", "column", "row"]}
            gap={[5, 5, 5, 10]}
            alignItems={"center"}
          >
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
          </Stack>

          {/* displaying the records pills */}
          <HStack
            flexWrap={"wrap"}
            gap={5}
            alignItems={"center"}
            justifyContent={"center"}
            pb={10}
            px={5}
          >
            {pillsData?.map((pill: IpillData) => {
              return <PillsData key={pill?.id} data={pill} />;
            })}
          </HStack>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Dashboard;
