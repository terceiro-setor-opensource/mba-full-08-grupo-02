import { Button } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // -1 indica que deve voltar para a página anterior
  };

  return (
    <Button px={10} display="flex" justifyContent="flex-start" width="10%"
     ml="auto"
     size="sm"
     variant="ghost"
     leftIcon={<FaArrowLeft color="black.500" />}
     iconSpacing="2" 
     onClick={handleBack}>
      Voltar
    </Button>
  );
};

export default BackButton;
