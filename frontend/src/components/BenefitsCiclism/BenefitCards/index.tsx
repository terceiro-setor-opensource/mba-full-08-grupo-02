// src/components/BenefitCard.tsx
import { Box, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';


interface BenefitCardProps {
  icon: ReactNode; 
  title: string;
  description: string;
  iconColor?: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, iconColor = "gray.500" }) => {

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
      <VStack spacing={0}>
        <Box color={iconColor} fontSize="3xl" >
          {icon}
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
