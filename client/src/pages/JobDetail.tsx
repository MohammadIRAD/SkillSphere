import React from 'react';
import { useParams } from 'wouter';

const JobDetail: React.FC = () => {
  const [params] = useParams();
  return <div className="p-8">Job detail for {JSON.stringify(params)}</div>;
};

export default JobDetail;
