import { HStack, Heading, VStack } from "@chakra-ui/react";
import Layout from "../Layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <VStack minH={"100vh"} w="full" pt={5} pl={60}>
        <Heading>Admin Dashboard</Heading>
      </VStack>
    </Layout>
  );
};

export default Dashboard;
