import { HStack, VStack } from "@chakra-ui/layout"
import { Icon, IconButton, Text } from '@chakra-ui/react'
import { chooseActivity } from "../../../../consts/Home";

export const ChooseActivity = () => {
    return (
        <HStack justifyContent="center" padding={60}>
            <VStack>
                <Text textAlign="center" textStyle={'h1'} color="neutral.400">Escolha sua atividade favorita</Text>
                <HStack wrap="wrap" gap={{ base: 2, md: 2, lg: 6 }} p={4} justifyContent="space-around" >
                    {chooseActivity.map(item => (
                        <VStack>
                            <IconButton aria-label={item.activity} icon={<Icon as={item.icon} color="#46F08F" w={12} h={12} />} bg="purple.200" borderRadius="100%" h={{ base: 16, md: 20, lg: 20 }} w={{ base: 16, md: 20, lg: 20 }} />
                            <Text textStyle={"h2"} color="neutral.400">{item.activity}</Text>
                        </VStack>
                    ))}
                </HStack>
            </VStack>
        </HStack>
    )
}