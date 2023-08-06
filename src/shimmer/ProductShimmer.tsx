import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductShimmer = () => {
  return (
    <Box width="250px" height="300px" flexShrink={0}>
      <Skeleton h="200px" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default ProductShimmer;
