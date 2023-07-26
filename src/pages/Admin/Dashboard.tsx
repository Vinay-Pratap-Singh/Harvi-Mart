import { Heading, VStack } from "@chakra-ui/react";
import Layout from "../Layout/Layout";
import { Helmet } from "react-helmet";

const Dashboard = () => {
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

      <VStack minH={"100vh"} w="full" pt={5} pl={60}>
        <Heading>Admin Dashboard</Heading>
      </VStack>
    </Layout>
  );
};

export default Dashboard;
