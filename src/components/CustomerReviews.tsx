import {
  Flex,
  HStack,
  Heading,
  IconButton,
  Progress,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
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
  const reviewStar = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  };

  // calculating the each number of stars
  reviews.length > 0 &&
    reviews.map((review: any) => {
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
  }, []);

  return (
    <VStack w={"full"} alignItems={"flex-start"}>
      {/* adding the reviews rating chart */}
      <HStack gap={20} mb={5}>
        <VStack fontWeight={"semibold"}>
          <Heading fontSize={"4xl"}>
            {(
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
            ).toFixed(1)}{" "}
            <IconButton
              icon={<AiFillStar fontSize={20} />}
              variant={"ghost"}
              _hover={{ bg: "none" }}
              color={"gray.400"}
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
              value={(reviewStar.fiveStar / reviews.length) * 100}
              colorScheme="green"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {(reviewStar.fiveStar / reviews.length) * 100}%
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
              value={(reviewStar.fourStar / reviews.length) * 100}
              colorScheme="green"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {(reviewStar.fourStar / reviews.length) * 100}%
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
              value={(reviewStar.threeStar / reviews.length) * 100}
              colorScheme="green"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {(reviewStar.threeStar / reviews.length) * 100}%
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
              value={(reviewStar.twoStar / reviews.length) * 100}
              colorScheme="yellow"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {(reviewStar.twoStar / reviews.length) * 100}%
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
              value={(reviewStar.oneStar / reviews.length) * 100}
              colorScheme="red"
              size="sm"
              w={60}
              borderRadius={5}
            />
            <Text color={"gray.600"}>
              {(reviewStar.oneStar / reviews.length) * 100}%
            </Text>
          </HStack>
        </Stack>
      </HStack>

      {reviews.length === 0 ? (
        <Text>No reviews available for this product :(</Text>
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
  );
};

export default CustomerReviews;
