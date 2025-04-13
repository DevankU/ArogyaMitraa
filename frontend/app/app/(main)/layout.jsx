import React from 'react';
import { DashBoard } from './dashboard/page';
import AppHeader from './_components/AppHeader';
function DashboardLayout({children}){
    return (
    
          <div className ='h-screen w-full max-w-[1800px] flex flex-col mx-auto'>
              {children}
          </div>
      
    )
}
export default DashboardLayout