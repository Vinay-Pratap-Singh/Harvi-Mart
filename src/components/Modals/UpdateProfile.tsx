import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiImageAdd, BiUser } from "react-icons/bi";
import { useState, ChangeEvent } from "react";
import { IupdateProfile } from "../../helper/interfaces";
import { updateUserDetails } from "../../redux/userSlice";
import { useAppDispatch } from "../../helper/Hooks/redux";

interface Iprops {
  updateProfileIsOpen: boolean;
  updateProfileOnOpen: () => void;
  updateProfileOnClose: () => void;
  data: { imageURL: string; name: string };
}

const UpdateProfile: React.FC<Iprops> = ({
  updateProfileIsOpen,
  updateProfileOnClose,
  updateProfileOnOpen,
  data,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IupdateProfile>({
    defaultValues: {
      fullName: data?.name || "",
    },
  });

  const dispatch = useAppDispatch();

  // for product image preview
  const [userImgPreview, setUserImgPreview] = useState(data?.imageURL);

  // function to get the url from the file
  const getPreviewURL = (event: ChangeEvent) => {
    const imageFile = (event.target as HTMLInputElement)?.files?.[0];
    if (imageFile) {
      setValue("userImage", imageFile);
      const imageURL = URL.createObjectURL(imageFile);
      setUserImgPreview(imageURL);
    }
  };

  // function to login the user
  const handleUpdate: SubmitHandler<IupdateProfile> = async (data) => {
    const res = await dispatch(updateUserDetails(data));
    if (res.payload?.success) {
      reset();
      setUserImgPreview("");
      updateProfileOnClose();
    } else {
      const { fullName, userImage } = watch();
      reset({ fullName, userImage });
    }
  };

  return (
    <>
      <Button
        onClick={updateProfileOnOpen}
        colorScheme="orange"
        color={"white"}
        w={"full"}
        fontSize={"15px"}
      >
        Update Profile
      </Button>

      <Modal
        size={"xs"}
        isOpen={updateProfileIsOpen}
        onClose={updateProfileOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontWeight={"bold"}>
            Update your profile details
          </ModalHeader>

          <form onSubmit={handleSubmit(handleUpdate)}>
            <ModalBody>
              {/* for image input */}
              <FormControl
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <FormLabel
                  htmlFor="userImage"
                  shadow={"md"}
                  borderRadius={"full"}
                  p={2}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  h={44}
                  w={44}
                  cursor={"pointer"}
                >
                  {userImgPreview ? (
                    <Image
                      h={"full"}
                      w={"full"}
                      src={userImgPreview}
                      alt="User Image"
                      borderRadius={"full"}
                    />
                  ) : (
                    <BiImageAdd fontSize={60} />
                  )}
                </FormLabel>
                <Input
                  id="userImage"
                  type="file"
                  multiple={false}
                  accept="image/*"
                  display={"none"}
                  onChange={getPreviewURL}
                />
              </FormControl>

              {/* for fullName */}
              <FormControl isInvalid={Boolean(errors?.fullName)}>
                <FormLabel fontSize={"sm"}>Your Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    fontSize={"xl"}
                    color={"orange.500"}
                    children={<BiUser />}
                  />
                  <Input
                    type="text"
                    placeholder="Vinay Pratap Singh Harvi"
                    focusBorderColor="primaryColor"
                    {...register("fullName", {
                      required: {
                        value: true,
                        message: "Please enter your full name",
                      },
                      minLength: {
                        value: 5,
                        message:
                          "Minimum length should be atleast 5 characters",
                      },
                    })}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.fullName && errors.fullName.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                loadingText="Updating..."
                type="submit"
                w={"full"}
                colorScheme="orange"
              >
                Update Profile
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfile;
