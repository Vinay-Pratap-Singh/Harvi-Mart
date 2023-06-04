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
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrEdit } from "react-icons/gr";

interface IupdateCategory {
  name: string;
  description: string;
}

interface Iprops {
  updateCategoryIsOpen: boolean;
  updateCategoryOnOpen: () => void;
  updateCategoryOnClose: () => void;
  data: { id: string; name: string; description: string };
}

const UpdateCategory: React.FC<Iprops> = ({
  updateCategoryIsOpen,
  updateCategoryOnClose,
  updateCategoryOnOpen,
  data,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IupdateCategory>({
    defaultValues: {
      name: data.name || "",
      description: data.description || "",
    },
  });

  //

  // function to update the category name
  const handleUpdate: SubmitHandler<IupdateCategory> = (data) => {};

  useEffect(() => {
    reset({ name: data?.name, description: data?.description });
  }, [data]);

  return (
    <>
      <Tooltip
        hasArrow
        label="Edit Category"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button onClick={updateCategoryOnOpen} p={1} size={"sm"}>
          <GrEdit />{" "}
        </Button>
      </Tooltip>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <Modal
          size={"sm"}
          isOpen={updateCategoryIsOpen}
          onClose={updateCategoryOnClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"} fontWeight={"bold"}>
              Update category details
            </ModalHeader>

            <ModalBody px={3}>
              {/* for name */}
              <FormControl isInvalid={Boolean(errors?.name)}>
                <FormLabel fontSize={"sm"}>Category Name</FormLabel>

                <Input
                  type="text"
                  placeholder="Shoes"
                  focusBorderColor="primaryColor"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Please enter category name",
                    },
                    minLength: {
                      value: 2,
                      message: "Minimum length should be 2 characters",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              {/* for description */}
              <FormControl isInvalid={Boolean(errors?.description)} mt={4}>
                <FormLabel fontSize={"sm"}>Category Description</FormLabel>

                <Textarea
                  resize={"none"}
                  height={32}
                  focusBorderColor="primaryColor"
                  placeholder="Enter the description of category..."
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Please enter category description",
                    },
                    minLength: {
                      value: 10,
                      message: "Minimum length should be 10 characters",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter px={3}>
              <Button
                isLoading={isSubmitting}
                loadingText="Updating..."
                type="submit"
                w={"full"}
                colorScheme="orange"
              >
                Update Category
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </>
  );
};

export default UpdateCategory;
