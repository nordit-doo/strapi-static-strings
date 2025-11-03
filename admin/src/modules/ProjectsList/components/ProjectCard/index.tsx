import {
  Box,
  Button,
  Card,
  CardContent,
  CardTitle,
  CardBody,
  Divider,
  Flex,
  Typography,
} from '@strapi/design-system';
import { Duplicate, Pencil, Trash } from '@strapi/icons';
import { ProjectCardProps } from './types';

export const ProjectCard: React.FC<ProjectCardProps> = ({
  onClipboardCopy,
  onEdit,
  onDelete,
  project,
}) => (
  <Card height="100%" width="100%">
    <CardBody minHeight="100px" width="320px">
      <CardContent>
        <CardTitle variant="beta" fontWeight="bold" marginTop="0.4rem">
          {project.name}
        </CardTitle>
        <Divider background="neutral200" marginTop="0.5rem" marginBottom="0.5rem" width="100%" />

        <Flex
          gap={1}
          onClick={onClipboardCopy(project)}
          alignItems="center"
          marginTop="0.5rem"
          style={{ opacity: 0.8, wordBreak: 'break-all' }}
        >
          <Duplicate />
          <Typography fontSize="1rem">{project.documentId}</Typography>
        </Flex>

        <Box paddingTop="1rem" paddingBottom="1rem" style={{ display: 'flex', flex: 1 }}>
          <Typography flex="1" variant="omega" style={{ wordBreak: 'break-word' }}>
            {project.description}
          </Typography>
        </Box>
      </CardContent>
    </CardBody>

    <Flex display="flex" gap="0.5rem" justifyContent="flex-end" padding="1rem" width="100%">
      <Button
        color="white"
        gap="0"
        variant="secondary"
        onClick={onDelete(project)}
        startIcon={<Trash color="white" />}
      />
      <Button gap="0" onClick={onEdit(project)} startIcon={<Pencil color="white" />} />
    </Flex>
  </Card>
);
