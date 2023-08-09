import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
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
import { IordersData } from "../../helper/interfaces";
import PillsData from "../../components/PillsData";

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

  // calculating the total earning
  let totalEarnedAmount = 0;
  orders.forEach((order: IordersData) => {
    totalEarnedAmount += order.total;
  });

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

        {/* displaying the records pills */}
        <HStack
          flexWrap={"wrap"}
          gap={5}
          alignItems={"center"}
          justifyContent={"center"}
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
