import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useEditor } from '../../contexts/EditorContext';
import { EditorSidebar } from '../editor/EditorSidebar';

export const Layout = ({ children }) => {
  const { isActive } = useEditor();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2ED]">
      <Navbar />
      <main className={`flex-1 ${isHomePage ? '' : 'pt-20'} ${isActive ? 'mr-[380px]' : ''}`} role="main" style={{ transition: 'margin 0.3s ease' }}>
        {children}
      </main>
      <Footer />
      {isActive && <EditorSidebar />}
    </div>
  );
};
