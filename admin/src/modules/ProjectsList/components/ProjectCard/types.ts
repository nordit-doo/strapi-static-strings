import { IProject } from '../../../../../../types/Project';

export interface ProjectCardProps {
  onClipboardCopy: (project: IProject) => (e: React.MouseEvent) => void;
  onEdit: (project: IProject) => (e: React.MouseEvent) => void;
  onDelete: (project: IProject) => (e: React.MouseEvent) => void;
  project: IProject;
}
