import { Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getIndividualProductReview } from "../redux/reviewSlice";

interface Iprop {
  productID: string;
}

const CustomerReviews: React.FC<Iprop> = ({ productID }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { reviews } = useSelector((state: RootState) => state.review);

  // getting the product review
  useEffect(() => {
    (async () => {
      await dispatch(getIndividualProductReview(productID));
    })();
  }, []);

  return (
    <VStack w={"full"} alignItems={"flex-start"}>
      {reviews.map((review: any) => {
        const formattedDate = new Date(review?.createdAt).toLocaleString(
          "en-US",
          {
            dateStyle: "medium",
          }
        );
        const formattedTime = new Date(review?.createdAt).toLocaleString(
          "en-US",
          {
            timeStyle: "short",
          }
        );
        return (
          <VStack
            key={review?._id}
            alignItems={"flex-start"}
            w={"full"}
            spacing={0}
          >
            <Heading fontSize={"xl"} fontWeight={"bold"}>
              {review.title}
            </Heading>
            <Text fontSize={"sm"} color={"gray.600"}>
              Reviewed on {formattedDate} {formattedTime}
            </Text>
            <Text fontWeight={"medium"}>{review.review}</Text>
            <Flex>
              {[...Array(5)].map((_, i) => (
                <IconButton
                  key={i}
                  icon={<AiFillStar fontSize={20} />}
                  variant={"ghost"}
                  _hover={{ bg: "none" }}
                  color={review.rating >= i + 1 ? "yellow.400" : "gray.200"}
                  aria-label={`Star ${i + 1}`}
                  size="xs"
                />
              ))}
            </Flex>
          </VStack>
        );
      })}
    </VStack>
  );
};

export default CustomerReviews;
