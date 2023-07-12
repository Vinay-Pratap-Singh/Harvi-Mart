import { Box, HStack, SkeletonText } from "@chakra-ui/react";

const AddressShimmer = () => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      rounded={"lg"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={5}
      w={96}
    >
      <SkeletonText
        mt="4"
        noOfLines={6}
        spacing="4"
        skeletonHeight="5"
        w={"full"}
      />
      <HStack mt="4" w={"full"}>
        <SkeletonText noOfLines={1} spacing="4" skeletonHeight="8" w={"full"} />
        <SkeletonText noOfLines={1} spacing="4" skeletonHeight="8" w={"full"} />
        <SkeletonText noOfLines={1} spacing="4" skeletonHeight="8" w={"full"} />
      </HStack>
    </Box>
  );
};

export default AddressShimmer;
