import { Stack, SimpleGrid, Skeleton, SkeletonText, VStack, Flex, HStack, Badge, Button } from '@chakra-ui/react'

export const PlaceDetailsSkeleton = () => {
  return (
    <Stack spacing={8} width="100%">
      {/* Image & Info Section */}
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={12}>
        {/* Image Skeleton */}
        <Skeleton height="300px" width="100%" rounded="md" />

        {/* Details Skeleton */}
        <Stack spacing={4} justifyContent="space-between" height="100%">
          <VStack alignItems="flex-start">
            <Flex justifyContent="space-between" width="100%">
              <Skeleton height="24px" width="60%" />
              <Skeleton height="24px" width="40px" rounded="full" />
            </Flex>
            <HStack wrap="wrap" spacing={2}>
              {[...Array(3)].map((_, i) => (
                <Badge key={i}>
                  <Skeleton height="20px" width="50px" />
                </Badge>
              ))}
            </HStack>
            <SkeletonText noOfLines={1} width="80%" />
            <Skeleton height="20px" width="50%" />
          </VStack>
          <Skeleton height="40px" width="100px" />
        </Stack>
      </SimpleGrid>

      {/* Description */}
      <SkeletonText noOfLines={4} spacing={4} />

      {/* Events Section */}
      <Stack spacing={4}>
        <Skeleton height="30px" width="200px" />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height="150px" width="100%" />
          ))}
        </SimpleGrid>
      </Stack>

      {/* Benefits Section */}
      <Stack spacing={4}>
        <Skeleton height="30px" width="250px" />
        <SkeletonText noOfLines={3} />
        <Skeleton height="40px" width="120px" />
      </Stack>

      {/* Feedback Section */}
      <Stack spacing={4}>
        <Skeleton height="30px" width="250px" />
        <Button isDisabled bg="gray.300" height="50px" width="100%">
          <Skeleton height="20px" width="50%" />
        </Button>
        <Stack spacing={3}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height="100px" width="100%" />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
