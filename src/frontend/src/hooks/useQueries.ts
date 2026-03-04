import { useMutation, useQuery } from "@tanstack/react-query";
import type { Inquiry, Product } from "../backend.d";
import { useActor } from "./useActor";

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["allProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInquiries(isAdmin: boolean) {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries", isAdmin],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInquiries(isAdmin);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation<
    boolean,
    Error,
    { name: string; email: string; message: string }
  >({
    mutationFn: async ({ name, email, message }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(name, email, message);
    },
  });
}
