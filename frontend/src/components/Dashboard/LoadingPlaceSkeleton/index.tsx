import { SimpleGrid } from "@chakra-ui/layout";
import { Card, CardBody, CardFooter, CardHeader, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function LoadingPlaceSkeleton() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w={'100%'}>
      {[1, 2, 3].map((_, index) => (
        <Card key={index} minW={{ base: '100%', md: 'auto' }}>
          <CardHeader padding={0} borderTopEndRadius={4} borderTopStartRadius={4}>
            <Skeleton height="200px" width="100%" borderRadius={4} />
          </CardHeader>

          <CardBody textAlign="start" paddingBottom={0}>
            <SkeletonText noOfLines={1} width="60%" skeletonHeight="20px" mb={2} />
            <SkeletonText noOfLines={2} width="80%" skeletonHeight="16px" />
          </CardBody>

          <CardFooter>
            <SkeletonCircle size="5" />
            <SkeletonText noOfLines={1} width="40px" ml={2} />
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
}
