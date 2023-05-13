import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiFillStar } from "react-icons/ai";

interface Iprop {
  onChange: (value: number) => void;
}

const StarReview: FC<Iprop> = ({ onChange }) => {
  const [rating, setRating] = useState(1);

  const handleStarClick = (value: number) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Flex>
      {[...Array(5)].map((_, i) => (
        <IconButton
          key={i}
          icon={<AiFillStar fontSize={28} />}
          variant={"ghost"}
          _hover={{ bg: "none" }}
          color={rating >= i + 1 ? "yellow.400" : "gray.200"}
          onClick={() => handleStarClick(i + 1)}
          aria-label={`Star ${i + 1}`}
          size="sm"
        />
      ))}
    </Flex>
  );
};

export default StarReview;
