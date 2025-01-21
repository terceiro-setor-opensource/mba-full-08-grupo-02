import { Box, Text, VStack } from "@chakra-ui/react";
import * as FaIcons from "react-icons/fa";
import { IconType } from "react-icons";

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  iconColor?: string;
}

const iconColors = [
  "red.500",
  "blue.500",
  "green.500",
  "yellow.500",
  "purple.500",
  "gray.500",
  "black.500",
  "orange.500",
  "teal.500",
  "pink.500",
];

export const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => {
  const IconComponent: IconType = FaIcons[icon as keyof typeof FaIcons] || FaIcons.FaStar;
  const randomColor = iconColors[Math.floor(Math.random() * iconColors.length)];

  return (
    <Box
      borderWidth="1px"
      borderRadius="8px"
      padding={6}
      textAlign="center"
      boxShadow="md"
      borderColor="gray.200"
      maxWidth="300px"
    >
      <VStack spacing={3}>
        <Box color={randomColor} fontSize="3xl">
          <IconComponent />
        </Box>
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default BenefitCard;
