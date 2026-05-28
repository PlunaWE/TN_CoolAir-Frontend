import { useQuery } from "@tanstack/react-query";
import { cartService } from "../services/cartService";

export function useCartApi() {
  return useQuery({ queryKey: ["cart"], queryFn: cartService.getCart });
}
