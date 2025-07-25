import { Document } from '@/components/medical/DocumentThumbnailView';
import ctThoraxPreview from '@/assets/ct-thorax-preview.jpg';
import mrtKopfPreview from '@/assets/mrt-kopf-preview.jpg';
import einstellbriefPreview from '@/assets/einstellbrief-preview.jpg';

export const localDocuments: Document[] = [
  {
    id: 'local1',
    name: 'CT Thorax',
    category: 'RAD',
    type: 'BLD',
    creationDate: '02.07.2025',
    uploadDate: '02.07.2025',
    author: 'Dr. Schmidt',
    uploader: 'Dr. Schmidt',
    department: 'RAD',
    source: 'local',
    pageCount: '1 Seite',
    thumbnailUrl: ctThoraxPreview,
  },
  {
    id: 'local2',
    name: 'MRT Kopf',
    category: 'RAD',
    type: 'BLD',
    creationDate: '01.07.2025',
    uploadDate: '01.07.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '1 Seite',
    thumbnailUrl: mrtKopfPreview,
  },
  // Dermatological examinations
  {
    id: 'local3',
    name: 'Hautläsion Unterbauch',
    category: 'DERM',
    type: 'FOT',
    creationDate: '30.06.2025',
    uploadDate: '30.06.2025',
    author: 'Dr. Müller',
    uploader: 'Dr. Müller',
    department: 'DERM',
    source: 'local',
    pageCount: '3 Bilder',
    thumbnailUrl: '/lovable-uploads/897e15d5-167b-4e31-888b-45159123c762.png',
  },
  {
    id: 'local4',
    name: 'Erythematöse Läsion Rücken',
    category: 'DERM',
    type: 'FOT',
    creationDate: '29.06.2025',
    uploadDate: '29.06.2025',
    author: 'Dr. Müller',
    uploader: 'Dr. Müller',
    department: 'DERM',
    source: 'local',
    pageCount: '2 Bilder',
    thumbnailUrl: '/lovable-uploads/6eaa638f-8841-423b-9ed8-dee6aeba1c57.png',
  },
  {
    id: 'local5',
    name: 'Vaskuläre Läsion',
    category: 'DERM',
    type: 'FOT',
    creationDate: '28.06.2025',
    uploadDate: '28.06.2025',
    author: 'Dr. Müller',
    uploader: 'Dr. Müller',
    department: 'DERM',
    source: 'local',
    pageCount: '2 Bilder',
    thumbnailUrl: '/lovable-uploads/fa10067b-ca25-4731-b422-ab4948ba925c.png',
  },
  {
    id: 'local6',
    name: 'Hautveränderung Oberarm',
    category: 'DERM',
    type: 'FOT',
    creationDate: '27.06.2025',
    uploadDate: '27.06.2025',
    author: 'Dr. Müller',
    uploader: 'Dr. Müller',
    department: 'DERM',
    source: 'local',
    pageCount: '1 Bild',
    thumbnailUrl: '/lovable-uploads/49eec6c8-b17d-4064-8e1c-1722d7c0d7e1.png',
  },
  // Brain MRI scans
  {
    id: 'local7',
    name: 'MRT Kopf axial T2',
    category: 'RAD',
    type: 'BLD',
    creationDate: '26.06.2025',
    uploadDate: '26.06.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '24 Schnitte',
    thumbnailUrl: '/lovable-uploads/8e0e9323-7286-476e-a984-b0a45ff452f2.png',
  },
  {
    id: 'local8',
    name: 'MRT Kopf axial T1',
    category: 'RAD',
    type: 'BLD',
    creationDate: '26.06.2025',
    uploadDate: '26.06.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '20 Schnitte',
    thumbnailUrl: '/lovable-uploads/1ea6381e-64a6-4574-8292-9737114875f7.png',
  },
  {
    id: 'local9',
    name: 'MRT Kopf axial FLAIR',
    category: 'RAD',
    type: 'BLD',
    creationDate: '26.06.2025',
    uploadDate: '26.06.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '18 Schnitte',
    thumbnailUrl: '/lovable-uploads/884f88e2-1435-46d4-9e03-8ba89ff1ee51.png',
  },
  {
    id: 'local10',
    name: 'MRT Kopf sagittal T1',
    category: 'RAD',
    type: 'BLD',
    creationDate: '26.06.2025',
    uploadDate: '26.06.2025',
    author: 'Dr. Weber',
    uploader: 'Dr. Weber',
    department: 'RAD',
    source: 'local',
    pageCount: '15 Schnitte',
    thumbnailUrl: '/lovable-uploads/4782d657-7249-47a1-9eaa-5ce20b7b5ca8.png',
  },
  {
    id: 'local11',
    name: 'Einstellbrief',
    category: 'BRIEF',
    type: 'EIN',
    creationDate: '03.07.2025',
    uploadDate: '03.07.2025',
    author: 'Dr. Zimmermann',
    uploader: 'Dr. Zimmermann',
    department: 'ALLG',
    source: 'local',
    pageCount: '1 Seite',
    thumbnailUrl: einstellbriefPreview,
  },
]; 