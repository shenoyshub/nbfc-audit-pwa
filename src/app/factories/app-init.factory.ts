import { AppInitService } from "../services/app-init.service";


export function appInitFactory(appInitService: AppInitService) {
  return () => appInitService.init();
}
