import { Button } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button padding={8} px={10} display="flex" justifyContent="flex-end" width="10%"
     size="sm"
     variant="ghost"
     leftIcon={<FaArrowLeft color="black.500" />}
     iconSpacing="2" 
     _hover={{ bg: "transparent" }}
     onClick={handleBack}>
      Voltar
    </Button>
  );
};

export default BackButton;
