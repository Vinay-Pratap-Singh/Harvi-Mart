import { Heading, Stack } from "@chakra-ui/react";
import Layout from "./Layout/Layout";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <Layout>
      <Heading color={"primaryColor"}>Homepage</Heading>
      <Footer />
    </Layout>
  );
};

export default Homepage;
