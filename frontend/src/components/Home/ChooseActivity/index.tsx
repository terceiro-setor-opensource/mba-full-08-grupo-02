import { HStack, VStack } from '@chakra-ui/layout'
import { Icon, IconButton, Text } from '@chakra-ui/react'
import { chooseActivity } from '@/consts/Home'
import { Dispatch, SetStateAction } from 'react'
import { Activity } from '@/models/activity'

interface ChooseActivityProps {
  title?: string
  color?: 'neutral.400' | 'neutral.500'
  setStateSearchBySportId: Dispatch<SetStateAction<number | undefined>>
  setStateSelectedActivityName?: Dispatch<SetStateAction<string>>
}

export const ChooseActivity = ({
  title = 'Escolha sua atividade favorita',
  color = 'neutral.400',
  setStateSearchBySportId,
  setStateSelectedActivityName,
}: ChooseActivityProps) => {
  function handleFilterByActivity(activity: any) {
    setStateSearchBySportId(activity.id)
    if (setStateSelectedActivityName)
      setStateSelectedActivityName(activity.activity)
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
              onClick={() => handleFilterByActivity(item)}
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
