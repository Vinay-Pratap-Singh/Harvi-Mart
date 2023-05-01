import { Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import jeansImage from "../assets/CategoryImages/jeans.png";
import tshirtImage from "../assets/CategoryImages/t-shirt.png";
import shoesImage from "../assets/CategoryImages/shoes.png";

interface Iprops {
  imageURL: string;
  categoryName: string;
  categoryDescription: string;
}
const CategoryCard: React.FC<Iprops> = ({
  imageURL,
  categoryDescription,
  categoryName,
}) => {
  return (
    <VStack w={80} shadow={"0 0 5px gray"} p={3} borderRadius={5}>
      <Image
        h={"48"}
        style={{
          filter: `drop-shadow(10px 10px 10px gray)`,
        }}
        src={
          imageURL === "jeans"
            ? jeansImage
            : imageURL === "tshirt"
            ? tshirtImage
            : shoesImage
        }
        alt="Category Card Image"
      />
      <Heading fontSize={"lg"}>{categoryName}</Heading>
      <Text fontWeight={"semibold"}>{categoryDescription}</Text>
      <Button colorScheme="orange" w={"full"}>
        Explore More
      </Button>
    </VStack>
  );
};

export default CategoryCard;
