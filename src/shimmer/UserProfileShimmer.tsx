import { Box, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const UserProfileShimmer = () => {
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
      <SkeletonCircle size="32" />
      <SkeletonText
        mt="4"
        noOfLines={3}
        spacing="4"
        skeletonHeight="5"
        w={"full"}
      />
      <HStack mt="4" w={"full"}>
        <SkeletonText noOfLines={1} spacing="4" skeletonHeight="8" w={"full"} />
        <SkeletonText noOfLines={1} spacing="4" skeletonHeight="8" w={"full"} />
      </HStack>
    </Box>
  );
};

export default UserProfileShimmer;
