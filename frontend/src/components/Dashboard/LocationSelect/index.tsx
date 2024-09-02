import theme from "@/theme";
import { HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import { t } from "i18next";
import { MdLocationOn } from "react-icons/md";
const responsiveWidth = {
  base: '100%',
  md: 'auto',
};
export const LocationSelect = () => (
  <HStack width={responsiveWidth}>
    <MdLocationOn color={theme.colors.neutral['500']} size={24} />
    <Select placeholder={t('dashboard.selectCity')} variant="unstyled">
      <option value="option1">{t('dashboard.saoPaulo')}</option>
    </Select>
  </HStack>
);