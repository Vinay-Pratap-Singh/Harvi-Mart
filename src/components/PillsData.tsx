import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";

const PillsData = ({ data }: any) => {
  return (
    <HStack
      w={60}
      borderRadius={"md"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
      py={5}
      boxShadow={"md"}
    >
      {/* adding the icon */}
      <Box
        borderRadius={"full"}
        h={14}
        w={14}
        boxShadow={"sm"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {data?.pillIcon}
      </Box>

      {/* displaying the details */}
      <VStack>
        <Heading fontSize={"lg"}>{data?.pillTitle}</Heading>
        <Text fontWeight={"semibold"} fontSize={"lg"} alignSelf={"flex-start"}>
          {data?.pillDetail}
        </Text>
      </VStack>
    </HStack>
  );
};

export default PillsData;
