import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductShimmer = () => {
  return (
    <Box
      width={["200px", "200px", "250px"]}
      height={["250px", "250px", "300px"]}
      flexShrink={0}
    >
      <Skeleton h="200px" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ProductShimmer;
