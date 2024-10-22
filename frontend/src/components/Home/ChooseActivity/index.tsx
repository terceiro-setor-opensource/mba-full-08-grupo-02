import { HStack, VStack } from '@chakra-ui/layout'
import { Icon, IconButton, Text } from '@chakra-ui/react'
import { chooseActivity } from '@/consts/Home'

interface ChooseActivityProps {
  title?: string
  color?: 'neutral.400' | 'neutral.500'
}

export const ChooseActivity = ({
  title = 'Escolha sua atividade favorita',
  color = 'neutral.400',
}: ChooseActivityProps) => {

  function handleNavigateToActivity(activity: string) {
    window.location.href = `/activities?q=${activity}`
  }

  return (
    <HStack justifyContent="center" padding={60}>
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
            <VStack key={index} gap={2} onClick={() => handleNavigateToActivity(item.activity)}>
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
