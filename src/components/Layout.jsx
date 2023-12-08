import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
function Layout() {
    return (
        <div>
            <div className=''>
                <CreateTask />
                <div className='w-full'>
                    <div className='outlet'>
                    <Outlet/>
                    </div>
                    <div className='indicator'>
                        <TaskIndicator />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Layout;