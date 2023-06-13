import { Box, HStack } from "@chakra-ui/react";

const ProductShimmer = () => {
  return (
    <Box
      width="250px"
      height="300px"
      bg="#f2f2f2"
      position="relative"
      overflow="hidden"
    >
      <Box
        as="div"
        content=""
        position="absolute"
        top={0}
        left="-100%"
        width="100%"
        height="100%"
        bgGradient="linear(to-r, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)"
        animation="shimmer 1.5s infinite"
      />
    </Box>
  );
};

export default ProductShimmer;
