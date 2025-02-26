import { HStack, VStack } from '@chakra-ui/layout'
import { Icon, IconButton, Text } from '@chakra-ui/react'
import { chooseActivity } from '@/consts/Home'
import { useNavigate } from 'react-router-dom'

interface ChooseActivityProps {
  title?: string
  color?: 'neutral.400' | 'neutral.500'
}

export const ChooseActivity = ({
  title = 'Escolha sua atividade favorita',
  color = 'neutral.400',
}: ChooseActivityProps) => {
  const navigate = useNavigate()

  function handleFilterByActivity(activity: { id: number; activity: string }) {
    navigate(`/places?sport=${activity.id}`)
  }

  return (
    <HStack justifyContent="center" padding={60} my={12}>
      <VStack>
        <Text textAlign="center" textStyle={'h1'} color={color}>
          {title}
        </Text>
        <HStack
          wrap="wrap"
          gap={{ base: 2, md: 2, lg: 6 }}
          p={4}
          justifyContent="space-around"
        >
          {chooseActivity.map((item, index) => (
            <VStack
              key={index}
              gap={2}
              cursor="pointer"
              onClick={() => handleFilterByActivity(item)}
              _hover={{ transform: 'scale(1.1)', transition: '0.2s' }}
            >
              <IconButton
                aria-label={item.activity}
                icon={<Icon as={item.icon} color="#46F08F" w={12} h={12} />}
                bg="purple.200"
                borderRadius="100%"
                h={{ base: 16, md: 20, lg: 20 }}
                w={{ base: 16, md: 20, lg: 20 }}
              />
              <Text textStyle={'h2'} color={color}>
                {item.activity}
              </Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
    </HStack>
  )
}
