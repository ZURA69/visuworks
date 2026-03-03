import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useEditor } from '../../contexts/EditorContext';
import { EditorSidebar } from '../editor/EditorSidebar';

export const Layout = ({ children }) => {
  const { isActive } = useEditor();

  return (
    <div className="min-h-screen flex flex-col bg-[#070910]">
      <Navbar />
      <main className={`flex-1 pt-20 ${isActive ? 'mr-[380px]' : ''}`} role="main" style={{ transition: 'margin 0.3s ease' }}>
        {children}
      </main>
      <Footer />
      {isActive && <EditorSidebar />}
    </div>
  );
};
