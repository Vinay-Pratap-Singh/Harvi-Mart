import { Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";

const UserReview = () => {
  const reviews = [
    {
      title: "Good Product",
      rating: 4,
      review: "This is my first purchase and i am very happy with it",
    },
    {
      title: "Bad Product",
      rating: 1,
      review: "This is my first purchase and i am very sad with this  product",
    },
  ];
  return (
    <VStack w={"full"} alignItems={"flex-start"}>
      {reviews.map((review, index) => {
        return (
          <VStack key={index} alignItems={"flex-start"} w={"full"} spacing={0}>
            <Heading fontSize={"md"} fontWeight={"bold"}>
              {review.title}
            </Heading>
            <Text fontWeight={"medium"}>{review.review}</Text>
            <Flex>
              {[...Array(5)].map((_, i) => (
                <IconButton
                  key={i}
                  icon={<AiFillStar fontSize={28} />}
                  variant={"ghost"}
                  _hover={{ bg: "none" }}
                  color={review.rating >= i + 1 ? "yellow.400" : "gray.200"}
                  aria-label={`Star ${i + 1}`}
                  size="sm"
                />
              ))}
            </Flex>
          </VStack>
        );
      })}
    </VStack>
  );
};

export default UserReview;
