import { useDispatch } from "react-redux";
import { IcouponData } from "../../helper/interfaces";
import { AppDispatch } from "../../redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAllCoupons, updateCoupon } from "../../redux/couponSlice";
import { useEffect } from "react";
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
import { GrEdit } from "react-icons/gr";

interface Iprops {
  updateCouponIsOpen: boolean;
  updateCouponOnOpen: () => void;
  updateCouponOnClose: () => void;
  data: IcouponData;
}

const UpdateCoupon: React.FC<Iprops> = ({
  updateCouponIsOpen,
  updateCouponOnClose,
  updateCouponOnOpen,
  data,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<{ id: string; isActive: boolean; discount: number }>({
    defaultValues: {
      id: data?.id,
      isActive: true,
      discount: data?.discount,
    },
  });

  // function to update the coupon discount
  const handleUpdate: SubmitHandler<{
    id: string;
    isActive: boolean;
    discount: number;
  }> = async (data) => {
    const res = await dispatch(
      updateCoupon({
        id: data.id,
        discount: data.discount,
        isActive: data.isActive,
      })
    );
    if (res.payload?.success) {
      reset();
      await dispatch(getAllCoupons());
      updateCouponOnClose();
    } else {
      const { id, isActive, discount } = watch();
      reset({ id, isActive, discount });
    }
  };

  // for setting the value on change
  useEffect(() => {
    reset({ id: data?.id, discount: data.discount, isActive: true });
  }, [data]);

  return (
    <>
      <Tooltip
        hasArrow
        label="Edit Coupon"
        color={"orange.500"}
        bgColor={"white"}
      >
        <Button onClick={updateCouponOnOpen} p={1} size={"sm"}>
          <GrEdit />{" "}
        </Button>
      </Tooltip>

      <Modal
        size={"xs"}
        isOpen={updateCouponIsOpen}
        onClose={updateCouponOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} fontWeight={"bold"}>
            Update Coupon Discount
          </ModalHeader>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <ModalBody px={3}>
              {/* for discount */}
              <FormControl isInvalid={Boolean(errors?.discount)}>
                <FormLabel fontSize={"sm"}>Coupon Discount</FormLabel>

                <Input
                  type="number"
                  placeholder="60"
                  focusBorderColor="primaryColor"
                  {...register("discount", {
                    required: {
                      value: true,
                      message: "Please enter discount percentage",
                    },
                  })}
                />

                <FormErrorMessage>
                  {errors.discount && errors.discount.message}
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
                Update Coupon
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateCoupon;
