import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      contactInfo,
      message,
    }: {
      name: string;
      contactInfo: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(name, contactInfo, message);
    },
  });
}

export function useSubmitOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      mobile,
      address,
      city,
      pincode,
      quantity,
    }: {
      name: string;
      mobile: string;
      address: string;
      city: string;
      pincode: string;
      quantity: number;
    }) => {
      if (!actor) throw new Error("Not connected");
      const a = actor as any;
      return a.submitOrder(
        name,
        mobile,
        address,
        city,
        pincode,
        BigInt(quantity),
      );
    },
  });
}

export function useGetOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor as any;
      return a.getOrders() as Promise<any[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      const a = actor as any;
      return a.isCallerAdmin() as Promise<boolean>;
    },
    enabled: !!actor && !isFetching,
  });
}
