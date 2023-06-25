import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createWishlist, getAllWishlists } from "../../redux/wishlistSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Iwishlist {
  name: string;
}

interface Iprops {
  addWishlistIsOpen: boolean;
  addWishlistOnOpen: () => void;
  addWishlistOnClose: () => void;
}

const AddWishlist: React.FC<Iprops> = ({
  addWishlistIsOpen,
  addWishlistOnClose,
  addWishlistOnOpen,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Iwishlist>({
    defaultValues: {
      name: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  // function to handle add new category
  const handleCreateCategory: SubmitHandler<Iwishlist> = async (data) => {
    const res = await dispatch(createWishlist(data.name));

    if (!res.payload) {
      navigate("/login");
    } else if (res.payload?.success) {
      reset();
      await dispatch(getAllWishlists());
      addWishlistOnClose();
    } else {
      const { name } = watch();
      reset({ name });
    }
  };

  // checking the logged in user
  useEffect(() => {
    if (!isLoggedIn) {
      addWishlistOnClose();
      toast.error("Please login to access wishlist");
    }
  }, []);

  return (
    <>
      <Button
        onClick={addWishlistOnOpen}
        colorScheme="orange"
        color={"white"}
        w={"fit-content"}
        fontSize={"xl"}
        size={"sm"}
      >
        <Tooltip
          hasArrow
          label="Create wishlist"
          color={"orange.500"}
          bgColor={"white"}
        >
          +
        </Tooltip>
      </Button>

      <Modal
        size={"sm"}
        isOpen={addWishlistIsOpen}
        onClose={addWishlistOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontWeight={"bold"}>
            Create new wishlist
          </ModalHeader>

          <form onSubmit={handleSubmit(handleCreateCategory)}>
            <ModalBody>
              {/* for wishlist name */}
              <FormControl isInvalid={Boolean(errors?.name)}>
                <FormLabel fontSize={"sm"}>Wishlist Name</FormLabel>

                <Input
                  type="text"
                  placeholder="Wedding collection"
                  focusBorderColor="primaryColor"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Please enter a wishlist name",
                    },
                    minLength: {
                      value: 3,
                      message: "Wishlist name should be atleast 3 characters",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                loadingText="Creating..."
                type="submit"
                w={"full"}
                colorScheme="orange"
              >
                Create new wishlist
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddWishlist;
