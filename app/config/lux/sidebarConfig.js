// @flow
import { ROUTES } from '../../routes-config';
import walletsIcon from '../../assets/images/sidebar/lux.inline.svg';
import btcIcon from '../../assets/images/sidebar/btc.inline.svg';
import luxgateIcon from '../../assets/images/sidebar/luxgate.inline.svg';
import settingsIcon from '../../assets/images/sidebar/settings-ic.inline.svg';
import luxRedemptionIcon from '../../assets/images/sidebar/lux-redemption-ic.inline.svg';

export const CATEGORIES = [
  {
    name: 'WALLETS',
    route: ROUTES.WALLETS.ROOT,
    icon: walletsIcon,
  },
  {
    name: 'BTCWALLET',
    route: ROUTES.BTCWALLET.ROOT,
    icon: btcIcon,
  },
  {
    name: 'LUXGATE',
    route: ROUTES.LUXGATE,
    icon: luxgateIcon,
  },
  /*{
    name: 'LUX_REDEMPTION',
    route: ROUTES.LUX_REDEMPTION,
    icon: luxRedemptionIcon,
  },
  {
    name: 'SETTINGS',
    route: ROUTES.SETTINGS.ROOT,
    icon: settingsIcon,
  },*/
];
