import React from 'react';
import { Link } from 'wouter';

export const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-gray-100">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">SkillSphere</Link>
        <div className="space-x-4">
          <Link href="/jobs">Jobs</Link>
          <Link href="/courses">Courses</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
