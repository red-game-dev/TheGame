import { WalletSubscriptionService } from "@services/WalletService";

export const WalletSubscriptionInitializer = (walletSubscriptionService: WalletSubscriptionService) => {
  return () => walletSubscriptionService.subscribeToWallets();
}
