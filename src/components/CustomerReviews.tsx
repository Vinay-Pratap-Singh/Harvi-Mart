import {
  Box,
  Flex,
  HStack,
  Heading,
  IconButton,
  Progress,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getIndividualProductReview } from "../redux/reviewSlice";
import DeleteReview from "./AlertBox/DeleteReview";

interface Iprop {
  productID: string;
}

const CustomerReviews = ({ productID }: Iprop) => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews } = useSelector((state: RootState) => state.review);
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const {
    isOpen: deleteReviewIsOpen,
    onOpen: deleteReviewOnOpen,
    onClose: deleteReviewOnClose,
  } = useDisclosure();
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const reviewStar = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  };
  reviews.length &&
    reviews.forEach((review: any) => {
      const rating = review?.rating;
      switch (rating) {
        case 1: {
          reviewStar.oneStar += 1;
          break;
        }
        case 2: {
          reviewStar.twoStar += 1;
          break;
        }
        case 3: {
          reviewStar.threeStar += 1;
          break;
        }
        case 4: {
          reviewStar.fourStar += 1;
          break;
        }
        case 5: {
          reviewStar.fiveStar += 1;
          break;
        }
      }
    });

  // getting the product review
  useEffect(() => {
    (async () => {
      await dispatch(getIndividualProductReview(productID));
    })();
  }, [productID]);

  return (
    <VStack w={"full"} alignItems={"flex-start"}>
      {/* adding the reviews rating chart */}
      <HStack gap={20} mb={5}>
        <VStack fontWeight={"semibold"}>
          <Heading fontSize={"4xl"}>
            {reviews.length
              ? (
                  (reviewStar?.fiveStar * 5 +
                    reviewStar?.fourStar * 4 +
                    reviewStar?.threeStar * 3 +
                    reviewStar?.twoStar * 2 +
                    reviewStar?.oneStar * 1) /
                  (reviewStar?.fiveStar +
                    reviewStar?.fourStar +
                    reviewStar?.threeStar +
                    reviewStar?.twoStar +
                    reviewStar?.oneStar)
                ).toFixed(1)
              : "0"}{" "}
            <IconButton
              icon={<AiFillStar fontSize={20} />}
              variant={"ghost"}
              _hover={{ bg: "none" }}
              color={"primaryColor"}
              aria-label="Review Star"
              size="xs"
              cursor={"default"}
            />
          </Heading>
          <Text textColor={"gray.600"} fontSize={"sm"}>
            Total {reviews.length} Reviews
          </Text>
        </VStack>

        {/* adding the reviews progress */}
        <Stack>
          <HStack fontSize={14} fontWeight={"semibold"}>
            <Text>
              5
              <IconButton
                icon={<AiFillStar fontSize={16} />}
                variant={"ghost"}
                _hover={{ bg: "none" }}
                color={"gray.400"}
                aria-label="Review Star"
                size="xs"
                cursor={"default"}
              />
            </Text>
            <Progress
              value={
                reviews.length
                  ? (reviewStar.fiveStar / reviews.length) * 100
                  : 0
              }
              colorScheme="green"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {reviews.length
                ? ((reviewStar.fiveStar / reviews.length) * 100).toFixed(1)
                : 0}
              %
            </Text>
          </HStack>

          <HStack fontSize={14} fontWeight={"semibold"}>
            <Text>
              4
              <IconButton
                icon={<AiFillStar fontSize={16} />}
                variant={"ghost"}
                _hover={{ bg: "none" }}
                color={"gray.400"}
                aria-label="Review Star"
                size="xs"
                cursor={"default"}
              />
            </Text>
            <Progress
              value={
                reviews.length
                  ? (reviewStar.fourStar / reviews.length) * 100
                  : 0
              }
              colorScheme="green"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {reviews.length
                ? ((reviewStar.fourStar / reviews.length) * 100).toFixed(1)
                : 0}
              %
            </Text>
          </HStack>

          <HStack fontSize={14} fontWeight={"semibold"}>
            <Text>
              3
              <IconButton
                icon={<AiFillStar fontSize={16} />}
                variant={"ghost"}
                _hover={{ bg: "none" }}
                color={"gray.400"}
                aria-label="Review Star"
                size="xs"
                cursor={"default"}
              />
            </Text>
            <Progress
              value={
                reviews.length
                  ? (reviewStar.threeStar / reviews.length) * 100
                  : 0
              }
              colorScheme="green"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {reviews.length
                ? ((reviewStar.threeStar / reviews.length) * 100).toFixed(1)
                : 0}
              %
            </Text>
          </HStack>

          <HStack fontSize={14} fontWeight={"semibold"}>
            <Text>
              2
              <IconButton
                icon={<AiFillStar fontSize={16} />}
                variant={"ghost"}
                _hover={{ bg: "none" }}
                color={"gray.400"}
                aria-label="Review Star"
                size="xs"
                cursor={"default"}
              />
            </Text>
            <Progress
              value={
                reviews.length ? (reviewStar.twoStar / reviews.length) * 100 : 0
              }
              colorScheme="yellow"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {reviews.length
                ? ((reviewStar.twoStar / reviews.length) * 100).toFixed(1)
                : 0}
              %
            </Text>
          </HStack>

          <HStack fontSize={14} fontWeight={"semibold"}>
            <Text>
              1
              <IconButton
                icon={<AiFillStar fontSize={16} />}
                variant={"ghost"}
                _hover={{ bg: "none" }}
                color={"gray.400"}
                aria-label="Review Star"
                size="xs"
                cursor={"default"}
              />
            </Text>
            <Progress
              value={
                reviews.length ? (reviewStar.oneStar / reviews.length) * 100 : 0
              }
              colorScheme="red"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {reviews.length
                ? ((reviewStar.oneStar / reviews.length) * 100).toFixed(1)
                : 0}
              %
            </Text>
          </HStack>
        </Stack>
      </HStack>

      <VStack gap={3} w={"full"}>
        {reviews.length === 0 ? (
          <Text fontWeight={"semibold"} fontSize={"lg"}>
            No reviews available for this product{" "}
            <Text as={"span"} color={"primaryColor"} fontWeight={"bold"}>
              :(
            </Text>
          </Text>
        ) : (
          reviews.map((review: any) => {
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
                boxShadow={"sm"}
                p={3}
                pos={"relative"}
              >
                <Heading fontSize={"xl"} fontWeight={"semibold"}>
                  {review.title}

                  {/* button to delete review if he is the user is the reviewer */}
                  {userDetails?._id === review?.reviewedBy && (
                    <Box
                      onClick={() => setIdToBeDeleted(review?._id)}
                      pos={"absolute"}
                      right={2}
                      top={2}
                    >
                      <DeleteReview
                        key={review?._id}
                        deleteReviewIsOpen={deleteReviewIsOpen}
                        deleteReviewOnClose={deleteReviewOnClose}
                        deleteReviewOnOpen={deleteReviewOnOpen}
                        reviewID={idToBeDeleted}
                        productID={productID}
                      />
                    </Box>
                  )}
                </Heading>
                <Text fontSize={"sm"} color={"gray.600"}>
                  Reviewed on {formattedDate} {formattedTime}
                </Text>
                <Text fontWeight={"medium"}>{review.review}</Text>
                <Flex>
                  {[...Array(5)].map((_, i) => (
                    <IconButton
                      key={i}
                      icon={<AiFillStar fontSize={16} />}
                      variant={"ghost"}
                      _hover={{ bg: "none" }}
                      color={review.rating >= i + 1 ? "yellow.400" : "gray.200"}
                      aria-label={`Star ${i + 1}`}
                      size="xs"
                      cursor={"default"}
                    />
                  ))}
                </Flex>
              </VStack>
            );
          })
        )}
      </VStack>
    </VStack>
  );
};

export default CustomerReviews;
