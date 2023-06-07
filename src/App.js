import { Routes, Route } from 'react-router-dom';
import { router } from './routes/index';

function App() {
    return (
        <>
            <Routes>
                {router.map((route, index) => {
                    return <Route key={index} path={route.path} element={<route.component />}></Route>;
                })}
            </Routes>
        </>
    );
}

export default App;
