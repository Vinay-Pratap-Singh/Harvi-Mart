import { HStack, SkeletonText } from "@chakra-ui/react";

const TableShimmer = () => {
  return (
    <HStack>
      <SkeletonText
        mt="4"
        noOfLines={10}
        spacing="4"
        skeletonHeight="5"
        w={"full"}
      />
    </HStack>
  );
};
export default TableShimmer;
