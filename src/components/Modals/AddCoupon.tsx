import { SubmitHandler, useForm } from "react-hook-form";
import { IcouponData } from "../../helper/interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
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
import { createCoupon, getAllCoupons } from "../../redux/couponSlice";

interface Iprops {
  addCouponIsOpen: boolean;
  addCouponOnOpen: () => void;
  addCouponOnClose: () => void;
}

const AddCoupon: React.FC<Iprops> = ({
  addCouponIsOpen,
  addCouponOnClose,
  addCouponOnOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IcouponData>();

  // function to handle add new coupon
  const handleCreateCoupon: SubmitHandler<IcouponData> = async (data) => {
    const newData = { couponCode: data.couponCode, discount: +data.discount };
    const res = await dispatch(createCoupon(newData));
    if (res.payload?.success) {
      reset();
      await dispatch(getAllCoupons());
      addCouponOnClose();
    } else {
      const { couponCode, discount } = watch();
      reset({ couponCode, discount });
    }
  };

  return (
    <>
      <Button
        onClick={addCouponOnOpen}
        colorScheme="orange"
        color={"white"}
        w={"full"}
        fontSize={"xl"}
        size={"sm"}
      >
        <Tooltip
          hasArrow
          label="Add Coupon"
          color={"orange.500"}
          bgColor={"white"}
        >
          +
        </Tooltip>
      </Button>

      <Modal size={"xs"} isOpen={addCouponIsOpen} onClose={addCouponOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontWeight={"bold"}>
            Add Coupon
          </ModalHeader>

          <form onSubmit={handleSubmit(handleCreateCoupon)}>
            <ModalBody>
              {/* for coupon code */}
              <FormControl isInvalid={Boolean(errors?.couponCode)}>
                <FormLabel fontSize={"sm"}>Coupon Code</FormLabel>

                <Input
                  type="text"
                  placeholder="HARVI50"
                  focusBorderColor="primaryColor"
                  {...register("couponCode", {
                    required: {
                      value: true,
                      message: "Please enter a coupon code",
                    },
                    minLength: {
                      value: 5,
                      message: "Coupon code should be atleast 5 characters",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.couponCode && errors.couponCode.message}
                </FormErrorMessage>
              </FormControl>

              {/* for coupon discount */}
              <FormControl isInvalid={Boolean(errors?.discount)} mt={3}>
                <FormLabel fontSize={"sm"}>Coupon Discount</FormLabel>
                <Input
                  type="number"
                  placeholder="50"
                  focusBorderColor="primaryColor"
                  {...register("discount", {
                    required: {
                      value: true,
                      message: "Please enter a discount amount",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.discount && errors.discount.message}
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
                Create New Coupon
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCoupon;
