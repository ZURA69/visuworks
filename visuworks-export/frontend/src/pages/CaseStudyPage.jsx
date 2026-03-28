import React from 'react';
import { useParams } from 'react-router-dom';
import { getProjectBySlug } from '../content/projects';
import CaseStudyTemplate from './CaseStudyTemplate';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  return <CaseStudyTemplate project={project} />;
}
