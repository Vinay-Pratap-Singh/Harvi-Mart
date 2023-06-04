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
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IcategoryDetails } from "../../helper/interfaces";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { createCategory, getAllCategories } from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";

interface Iprops {
  addCategoryIsOpen: boolean;
  addCategoryOnOpen: () => void;
  addCategoryOnClose: () => void;
}

const AddCategory: React.FC<Iprops> = ({
  addCategoryIsOpen,
  addCategoryOnClose,
  addCategoryOnOpen,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IcategoryDetails>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // function to handle add new category
  const handleCreateCategory: SubmitHandler<IcategoryDetails> = async (
    data
  ) => {
    const res = await dispatch(createCategory(data));

    if (!res.payload) {
      navigate("/login");
    } else if (res.payload?.success) {
      reset();
      await dispatch(getAllCategories());
      addCategoryOnClose();
    } else {
      const { name, description } = watch();
      reset({ name, description });
    }
  };

  return (
    <>
      <Button
        onClick={addCategoryOnOpen}
        colorScheme="orange"
        color={"white"}
        w={"full"}
        fontSize={"xl"}
        size={"sm"}
      >
        <Tooltip hasArrow label="Add Category">
          +
        </Tooltip>
      </Button>

      <Modal
        size={"sm"}
        isOpen={addCategoryIsOpen}
        onClose={addCategoryOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontWeight={"bold"}>
            Add Category
          </ModalHeader>

          <form onSubmit={handleSubmit(handleCreateCategory)}>
            <ModalBody>
              {/* for category name */}
              <FormControl isInvalid={Boolean(errors?.name)}>
                <FormLabel fontSize={"sm"}>Category Name</FormLabel>

                <Input
                  type="text"
                  placeholder="Trowsers"
                  focusBorderColor="primaryColor"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Please enter a category name",
                    },
                    minLength: {
                      value: 5,
                      message: "Category name should be atleast 5 characters",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              {/* for category description */}
              <FormControl isInvalid={Boolean(errors?.description)} mt={3}>
                <FormLabel fontSize={"sm"}>
                  Category Description (Optional)
                </FormLabel>

                <Textarea
                  placeholder="We have the best collection of trowsers from the multiple brands"
                  focusBorderColor="primaryColor"
                  resize="none"
                  h="28"
                  {...register("description", {
                    minLength: {
                      value: 18,
                      message:
                        "Category description should be atleast 18 characters",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                loadingText="Adding..."
                type="submit"
                w={"full"}
                colorScheme="orange"
              >
                Add New Category
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCategory;
